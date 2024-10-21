// import { PrismaClient } from "@prisma/client";
import {prisma} from "@/lib/prisma"

import { error } from "console";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{params}:{params:{title:string}},  res:NextApiResponse){
    // const prisma = new PrismaClient();
    const movieTitle = params.title;

    if(!movieTitle || typeof movieTitle !== 'string'){
        return res.status(400).json({
            error:'movie title is required and it must be a string'
        });
    };

    try{
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
        const result = theaters.map(theater =>({
            theaterName:theater.name,
            theaterLocation:theater.location,
            
        }))
        console.log(result);
        return NextResponse.json({
            message:"fetched theater list",
            data:result
        },{
            status:200
        });

    }catch(err:unknown){
        let errorMessage = "an error has occurred while getting the theaters";
        if(err instanceof Error){
            errorMessage=err.message;
        }
        console.error("unable to fetch the theater list",err);
        return NextResponse.json({
            message:"error getting the theater list",
            error:errorMessage,
        },{
            status:500,
        })
    }
}