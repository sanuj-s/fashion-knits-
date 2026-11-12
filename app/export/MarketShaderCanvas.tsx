'use client';

import { useEffect, useRef } from 'react';
import styles from './GlobalExperience.module.css';

export type MarketShaderPointer = {
  x: number;
  y: number;
  active: boolean;
};

type MarketShaderCanvasProps = {
  active: boolean;
  reducedMotion: boolean;
  pointerRef: { current: MarketShaderPointer };
};

type MarketGpuPass = {
  setPipeline: (pipeline: unknown) => void;
  setBindGroup: (index: number, bindGroup: unknown) => void;
  draw: (vertexCount: number) => void;
  end: () => void;
};

type MarketGpuDevice = {
  queue: {
    writeBuffer: (buffer: unknown, offset: number, data: Float32Array) => void;
    submit: (commands: unknown[]) => void;
  };
  createShaderModule: (descriptor: { code: string }) => unknown;
  createBuffer: (descriptor: { size: number; usage: number }) => unknown;
  createRenderPipeline: (descriptor: unknown) => {
    getBindGroupLayout: (index: number) => unknown;
  };
  createBindGroup: (descriptor: unknown) => unknown;
  createCommandEncoder: () => {
    beginRenderPass: (descriptor: unknown) => MarketGpuPass;
    finish: () => unknown;
  };
  destroy: () => void;
};

type MarketGpuContext = {
  configure: (configuration: { device: MarketGpuDevice; format: string; alphaMode: string }) => void;
  getCurrentTexture: () => { createView: () => unknown };
};

type MarketGpuAdapter = {
  requestDevice: () => Promise<MarketGpuDevice>;
};

type MarketGpuApi = {
  requestAdapter: () => Promise<MarketGpuAdapter | null>;
  getPreferredCanvasFormat: () => string;
};

const SHADER = /* wgsl */ `
struct Uniforms {
  resolution: vec2<f32>,
  pointer: vec2<f32>,
  timing: vec4<f32>,
};

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  let points = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>(3.0, -1.0),
    vec2<f32>(-1.0, 3.0)
  );
  var output: VertexOutput;
  let point = points[vertexIndex];
  output.position = vec4<f32>(point, 0.0, 1.0);
  output.uv = vec2<f32>(point.x * 0.5 + 0.5, 0.5 - point.y * 0.5);
  return output;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4<f32> {
  let aspect = uniforms.resolution.x / max(uniforms.resolution.y, 1.0);
  let pointer = select(vec2<f32>(0.5, 0.5), uniforms.pointer, uniforms.timing.y > 0.5);
  let local = (input.uv - pointer) * vec2<f32>(aspect, 1.0);
  let distanceToPointer = length(local);
  let ripple = 0.5 + 0.5 * sin(distanceToPointer * 48.0 - uniforms.timing.x * 2.0);
  let falloff = 1.0 - smoothstep(0.0, 0.46, distanceToPointer);
  let softField = exp(-distanceToPointer * 2.4) * 0.045;
  let waveField = pow(max(ripple, 0.0), 2.0) * falloff * 0.075;
  let alpha = min(0.14, 0.012 + softField + waveField);
  return vec4<f32>(0.78, 0.64, 0.41, alpha);
}
`;

export function MarketShaderCanvas({ active, reducedMotion, pointerRef }: MarketShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const reducedMotionRef = useRef(reducedMotion);
  const wakeRef = useRef<(() => void) | null>(null);

  activeRef.current = active;
  reducedMotionRef.current = reducedMotion;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let frameId = 0;
    let startedAt = 0;
    let initialization: Promise<void> | null = null;
    let device: MarketGpuDevice | null = null;
    let context: MarketGpuContext | null = null;
    let gpuReady = false;
    let uniformBuffer: unknown;
    let pipeline: { getBindGroupLayout: (index: number) => unknown } | null = null;
    let bindGroup: unknown;
    const uniformData = new Float32Array(8);

    const resizeCanvas = () => {
      if (!gpuReady) return;
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.15);
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
    };

    const render = (time: number) => {
      if (!device || !context || !uniformBuffer || !pipeline || !bindGroup || disposed) return;
      resizeCanvas();
      const pointer = pointerRef.current;
      const elapsed = reducedMotionRef.current ? 0 : (time - startedAt) / 1000;
      uniformData[0] = canvas.width;
      uniformData[1] = canvas.height;
      uniformData[2] = pointer.x;
      uniformData[3] = pointer.y;
      uniformData[4] = elapsed;
      uniformData[5] = pointer.active ? 1 : 0;
      uniformData[6] = 0;
      uniformData[7] = 0;
      device.queue.writeBuffer(uniformBuffer, 0, uniformData);

      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [{
          view: context.getCurrentTexture().createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: 'clear',
          storeOp: 'store',
        }],
      });
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.draw(3);
      pass.end();
      device.queue.submit([encoder.finish()]);

      if (activeRef.current && !reducedMotionRef.current) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const start = () => {
      if (!activeRef.current || disposed) return;
      if (device && context) {
        if (frameId) window.cancelAnimationFrame(frameId);
        startedAt = performance.now();
        frameId = window.requestAnimationFrame(render);
        return;
      }
      if (initialization) return;

      initialization = (async () => {
        try {
          const gpu = (navigator as Navigator & { gpu?: MarketGpuApi }).gpu;
          if (!gpu) return;
          const adapter = await gpu.requestAdapter();
          if (!adapter || disposed) return;
          const requestedDevice = await adapter.requestDevice();
          if (disposed) {
            requestedDevice.destroy();
            return;
          }
          const gpuContext = (canvas as unknown as { getContext: (name: string) => unknown })
            .getContext('webgpu') as MarketGpuContext | null;
          if (!gpuContext) {
            requestedDevice.destroy();
            return;
          }

          gpuReady = true;
          resizeCanvas();
          const format = gpu.getPreferredCanvasFormat();
          gpuContext.configure({ device: requestedDevice, format, alphaMode: 'premultiplied' });
          const shader = requestedDevice.createShaderModule({ code: SHADER });
          const renderPipeline = requestedDevice.createRenderPipeline({
            layout: 'auto',
            vertex: { module: shader, entryPoint: 'vertexMain' },
            fragment: {
              module: shader,
              entryPoint: 'fragmentMain',
              targets: [{
                format,
                blend: {
                  color: { srcFactor: 'src-alpha', dstFactor: 'one-minus-src-alpha', operation: 'add' },
                  alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
                },
              }],
            },
            primitive: { topology: 'triangle-list' },
          });
          const buffer = requestedDevice.createBuffer({ size: 32, usage: 72 });
          const group = requestedDevice.createBindGroup({
            layout: renderPipeline.getBindGroupLayout(0),
            entries: [{ binding: 0, resource: { buffer } }],
          });

          device = requestedDevice;
          context = gpuContext;
          uniformBuffer = buffer;
          pipeline = renderPipeline;
          bindGroup = group;
          startedAt = performance.now();
          if (activeRef.current) render(performance.now());
        } catch {
          // The CSS field remains as a graceful fallback if GPU setup is unavailable.
        }
      })();
      void initialization;
    };

    const pause = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const handleVisibility = () => {
      if (document.hidden) pause();
      else start();
    };
    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(resizeCanvas)
      : null;
    observer?.observe(canvas);
    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    wakeRef.current = start;
    if (activeRef.current) start();

    return () => {
      disposed = true;
      pause();
      observer?.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
      device?.destroy();
      wakeRef.current = null;
    };
  }, [pointerRef]);

  useEffect(() => {
    if (active) wakeRef.current?.();
  }, [active, reducedMotion]);

  return <canvas ref={canvasRef} className={styles.marketShaderCanvas} aria-hidden="true" />;
}
