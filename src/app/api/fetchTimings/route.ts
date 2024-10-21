// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; 

// export async function GET(req: Request) {
//   try {
//     // Extract query parameters
//     const { searchParams } = new URL(req.url);
//     const movieId = searchParams.get('movieId');
//     const theaterId = searchParams.get('theaterId');

//     if (!movieId || !theaterId) {
//       return NextResponse.json(
//         { message: 'Missing movieId or theaterId in request query.' },
//         { status: 400 }
//       );
//     }

//     // Fetch showtimes from the MovieTheater model
//     const movieTheater = await prisma.movieTheater.findFirst({
//       where: {
//         movieId: parseInt(movieId),
//         theaterId: parseInt(theaterId),
//       },
//       select: {
//         showTimes: true, // Fetch the showTimes field
//       },
//     });

//     // Check if showtimes were found
//     if (!movieTheater) {
//       return NextResponse.json(
//         { message: 'No showtimes found for the selected movie and theater.' },
//         { status: 404 }
//       );
//     }

//     // Parse the showTimes string if it is stored in JSON format
//     const showTimes = JSON.parse(movieTheater.showTimes);
//     console.log('the showtimes are :',showTimes);
//     // Return the showtimes
//     return NextResponse.json({ showTimes });
//   } catch (error) {
//     console.error('Error fetching showtimes:', error);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
