import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import {prisma} from "@/lib/prisma"

export async function GET(request:Request,{params}:{params:{id:string}}){
    // const prisma = new PrismaClient();
    const movieId = parseInt(params.id);

try{
    const movie = await prisma.movie.findUnique({
        where:{
            id:movieId
        },
    });

    if (!movie) {
        return NextResponse.json({
          message: "Movie not found",
        }, {
          status: 404,
        });
      }
    const movieTitle = movie?.title;

    const theaters = await prisma.theater.findMany({
        where:{
            movies:{
                some:{
                    movie:{
                        title:movieTitle,
                    },
                },
            },
        },
        include:{
            movies:{
                include:{
                    movie:true,
                    
                    
                },
            },
        },
    });
       
    return NextResponse.json({
        message:"fetched movie details successfully",
        data:{
            movie,
            theaters,
        }
    },{
        status:200
    })
}catch(err:unknown){
    let errorMessage = "an unknown error while fetching movie details";
    if(err instanceof Error){
        errorMessage=err.message;
    }
    console.log("unable to fetch movie details",err);
    return NextResponse.json({
        message:"error fetching movies",
        error:errorMessage,
    },{
        status:500
    })
}
}