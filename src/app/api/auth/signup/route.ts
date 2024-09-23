import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { error } from "console";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request) {
    const {email, passowrd, role, theaterName}=await req.json();

    //cheching if the user already exists
    const existingUser = await prisma.user.findUnique({
        where:{email},
    });

    if(existingUser){
        return NextResponse.json({
            error:"the user already exists",
            
        },
    {
        status:404
    });
    };


    //hashing the password
    if(!passowrd || typeof passowrd!=='string'){
        return new Response(JSON.stringify({error:'password is required'}),{
            status:400,
        });
    }
    try{
        const hashedPassword = await bcrypt.hash(passowrd,10);
        if(role==="owner"){
            const owner = await prisma.user.create({
                data:{
                    email,
                    password:hashedPassword,
                    role:"THEATER_OWNER",
                    theaters:{
                        //@ts-ignore
                        create:{
                            name:theaterName,
                        },
                    },
                },
            });
            return NextResponse.json(owner,{status:201});
            console.log("owner created");
            
        }
        else{
            //@ts-ignore
            const consumer = await prisma.create({
                data:{
                    email,
                    passowrd:hashedPassword,
                    role:"CONSUMER"
                },
            });
            return NextResponse.json(consumer,{status:201});
        }

        return new Response(JSON.stringify({
            success:true,
        }),
    {
        status:200
    });


    }catch(error){
        return new Response(JSON.stringify({
            error:'signup failed'
        }),{
            status:500,
        })
    }



    //create new user based on role

}
