export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Params = {
  params: { id: string };
};

// GET /api/admin/events/[id]
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/admin/events/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();

    if (
      !session ||
      (session.user?.role !== "ORGANIZER" && session.user?.role !== "ADMIN")
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: {
        ...body,
        startAt: body.startAt ? new Date(body.startAt) : undefined,
        endAt: body.endAt ? new Date(body.endAt) : undefined,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/events/[id]
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await prisma.event.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
