import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { movieId, theaterId, seats, email } = body;

    if (!movieId || !theaterId || !seats || !email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if any of the selected seats are already booked
    const existingBookings = await prisma.booking.findMany({
      where: {
        movieId: parseInt(movieId),
        theaterId: parseInt(theaterId),
        seatId: {
          in: seats,
        },
      },
    });

    if (existingBookings.length > 0) {
      return NextResponse.json(
        { message: 'One or more seats are already booked', bookedSeats: existingBookings.map(booking => booking.seatId) },
        { status: 409 }
      );
    }

    // Book the selected seats
    const bookings = seats.map((seatId) => ({
      userId: user.id, // Using the user ID from the found user
      movieId: parseInt(movieId),
      theaterId: parseInt(theaterId),
      seatId: seatId,
    }));

    await prisma.booking.createMany({
      data: bookings,
    });

    return NextResponse.json({
      message: 'Seats successfully booked!',
    });
  } catch (error) {
    console.error('Error booking seats:', error);
    return NextResponse.json(
      {
        message: 'Failed to book seats',
        error: error.message || error.toString(),
      },
      { status: 500 }
    );
  }
}
