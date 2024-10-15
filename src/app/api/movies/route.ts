import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export async function GET(req:NextRequest) {
    const prisma = new PrismaClient();



    try{
        // const body = await req.json();
        const movies = await prisma.movie.findMany()
        console.log(movies)
        return NextResponse.json({
            message:"fetched movies",
            data:movies
        },{
            status:200
        });
    }catch(err:unknown){
        let errorMessage = "an unknown error has occurred";
        if(err instanceof Error){
            errorMessage=err.message;
        }
        console.error("unable to fetch moveis ",err)
        return NextResponse.json({
            message:"error fetching movies",
            error:errorMessage,
        },{
            status:500,
        })
    }
}