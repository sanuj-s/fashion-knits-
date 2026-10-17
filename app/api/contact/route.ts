import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function deliveryConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = process.env.INQUIRY_TO_EMAIL?.split(',').map((email) => email.trim()).filter(Boolean);
  return apiKey && from && to?.length ? { apiKey, from, to } : null;
}

export async function GET() {
  return NextResponse.json(
    { deliveryConfigured: Boolean(deliveryConfig()) },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

function readField(value: unknown, limit: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, limit);
}

export async function POST(request: Request) {
  const config = deliveryConfig();
  if (!config) {
    return NextResponse.json(
      { success: false, deliveryConfigured: false, error: 'Online enquiry delivery is not configured. Use the prepared email option or contact the export desk directly.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please submit the enquiry form again.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Please submit the enquiry form again.' }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;
  const name = readField(fields.name, 120);
  const company = readField(fields.company, 160);
  const email = readField(fields.email, 254);
  const phone = readField(fields.phone, 50);
  const country = readField(fields.country, 100);
  const productInterest = readField(fields.productInterest, 120);
  const targetQuantity = readField(fields.targetQuantity, 100);
  const message = readField(fields.message, 3000);

  if (!name || !company || !email || !country || !message) {
    return NextResponse.json({ error: 'Name, company, work email, country and project details are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const subjectCompany = company.replace(/[\r\n]+/g, ' ').slice(0, 100);
  const text = [
    'Fashion Knits website enquiry',
    '',
    `Name: ${name}`,
    `Company / brand: ${company}`,
    `Email: ${email}`,
    `Country: ${country}`,
    `Phone: ${phone || 'Not provided'}`,
    `Product interest: ${productInterest || 'Not specified'}`,
    `Estimated quantity: ${targetQuantity || 'Not specified'}`,
    '',
    'Project details:',
    message,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        reply_to: email,
        subject: `Website production enquiry · ${subjectCompany}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, deliveryConfigured: true, error: 'The email service did not accept this enquiry. Please use the prepared email option or contact the export desk directly.' },
        { status: 502, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    const result = await response.json() as { id?: string };
    return NextResponse.json(
      {
        success: true,
        referenceId: result.id,
        message: 'The email provider accepted this enquiry for delivery. This does not confirm that it has been read.',
      },
      { status: 202, headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return NextResponse.json(
      { success: false, deliveryConfigured: true, error: 'The email service could not be reached. Please use the prepared email option or contact the export desk directly.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
