import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [totalPosts, publishedPosts, totalReservations, pendingReservations, totalMessages, unreadMessages] =
      await Promise.all([
        prisma.blogPost.count(),
        prisma.blogPost.count({ where: { published: true } }),
        prisma.reservation.count(),
        prisma.reservation.count({ where: { status: 'PENDING' } }),
        prisma.message.count(),
        prisma.message.count({ where: { read: false } }),
      ]);

    return NextResponse.json({
      posts: { total: totalPosts, published: publishedPosts },
      reservations: { total: totalReservations, pending: pendingReservations },
      messages: { total: totalMessages, unread: unreadMessages },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
