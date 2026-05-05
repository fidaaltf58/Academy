import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { sendBookingConfirmation } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const reservations = await prisma.reservation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reservations);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, date, time, service, note } = await request.json();

    if (!name || !email || !phone || !date || !time || !service) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const reservation = await prisma.reservation.create({
      data: { name, email, phone, date, time, service, note },
    });

    // Send confirmation email (placeholder)
    await sendBookingConfirmation(email, name, date, time, service);

    return NextResponse.json(reservation, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
