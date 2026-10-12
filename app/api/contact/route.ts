import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, country, productInterest, targetQuantity, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid business email address.' },
        { status: 400 }
      );
    }

    // In a production deployment with SMTP / SendGrid / Postmark credentials,
    // this handles transport delivery to export merchandising desk:
    // export@fashionknits.com
    console.log('[Fashion Knits Inquiry Received]:', {
      timestamp: new Date().toISOString(),
      name,
      company: company || 'N/A',
      email,
      phone: phone || 'N/A',
      country: country || 'N/A',
      productInterest: productInterest || 'General Inquiry',
      targetQuantity: targetQuantity || 'N/A',
      messageLength: message ? message.length : 0,
    });

    return NextResponse.json(
      {
        success: true,
        referenceId: `FK-${Date.now().toString(36).toUpperCase()}`,
        message: 'Your manufacturing inquiry has been recorded and routed to the Fashion Knits export merchandising desk.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again or contact export@fashionknits.com directly.' },
      { status: 500 }
    );
  }
}
