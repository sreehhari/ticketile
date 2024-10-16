import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request:Request,{params}:{params:{id:string}}){
    const prisma = new PrismaClient();
    const movieId = parseInt(params.id);

try{
    const movie = await prisma.movie.findUnique({
        where:{
            id:movieId
        },
    });
    console.log(movie);
    return NextResponse.json({
        message:"fetched movie details successfully",
        data:movie
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