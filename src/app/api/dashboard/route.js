import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const prisma = new PrismaClient();


    try{
        const body = await req.json();


        if(!body.name || !body.date){
            return NextResponse.json({
                message:"some fields are empty"
            },
        {
            status:400
        });

        };

        const result = await prisma.movie.create({
            data:{
                title:body.name,
                showDate:body.date,
                
            }
        });
        return NextResponse.json({
            message:"movie create successfully"
        },{
            status:201
        });

    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            message:"not able to create movie"
        },{
            status:500
        })
    }
    finally{
        await prisma.$disconnect();
    }
}