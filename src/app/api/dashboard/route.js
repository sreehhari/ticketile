import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);

    // Validate input
    if (!body.name || !body.date || !body.description || !body.posterUrl || !body.ownerEmail) {
      return NextResponse.json(
        {
          message: "Some fields are empty",
        },
        {
          status: 400,
        }
      );
    }

    // Find theater by owner's email
    const theaterId = await prisma.theater.findFirst({
      where: {
        owner: {
          email: body.ownerEmail,  // Correct way to query through relation
        },
      },
      select: {
        id: true,
      },
    });

    console.log("The theater is: ", theaterId);

    if (!theaterId) {
      return NextResponse.json(
        {
          message: "Theater not found for this user",
        },
        {
          status: 404,
        }
      );
    }

    // Create the movie
    const result = await prisma.movie.create({
      data: {
        title: body.name,
        showDate: body.date,
        description: body.description,
        posterUrl: body.posterUrl,
        theaters: {
          create: {
            theaterId: theaterId.id,  // Use the found theaterId
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Movie created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Not able to create movie",
        error: error.message || error.toString(),
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
