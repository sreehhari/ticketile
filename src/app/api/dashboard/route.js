import { PrismaClient } from "@prisma/client";
// import { Session } from "inspector";
import { NextResponse } from "next/server";

export async function POST(req) {
    const prisma = new PrismaClient();


    try{
        const body = await req.json();


        if(!body.name || !body.date || !body.description || !body.posterUrl ){
            return NextResponse.json({
                message:"some fields are empty"
            },
        {
            status:400
        });

        };
        const theaterId = await prisma.theater.findFirst({
            where:{
                ownerId:body.ownerId,
            },
            
            select:{
                    id:true,
                },
            

        });
        console.log("the theater is : ",theaterId);
        if (!theaterId) {
            return NextResponse.json({
              message: "Theater not found for this user",
            }, {
              status: 404,
            });
          }

        const result = await prisma.movie.create({
            data:{
                title:body.name,
                showDate:body.date,
                description:body.description,
                showtime:body.showtime,
                posterUrl:body.posterUrl,
                theaters:{
                    create:{
                        theaterId:theaterId.id,
                        showTimes:body.showtime
                    },
                },

                
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
            message:"not able to create movie",
            error:error.message || error.toString(),
        },{
            status:500
        },
    )
    }
    finally{
        await prisma.$disconnect();
    }
}