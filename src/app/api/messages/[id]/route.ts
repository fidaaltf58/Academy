import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { read } = await request.json();

    const message = await prisma.message.update({
      where: { id },
      data: { read },
    });

    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.message.delete({ where: { id } });
    return NextResponse.json({ message: 'Message deleted' });
  } catch (error) {
    console.error('Prisma Delete Error (Message):', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
