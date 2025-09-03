import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'ORGANIZER' && session.user?.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, startAt, endAt, location, price, capacity, tags, image } = body;

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        location,
        price,
        capacity,
        tags,
        image,
        organizerId: session.user.id, // Assuming organizerId is linked to the user session
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


