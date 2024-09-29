import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:NextRequest) {
    const {email, password, role, theaterName,name,location}=await req.json();

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
    if(!password){
        return new Response(JSON.stringify({error:'password is required'}),{
            status:400,
        });
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        if(role==="owner"){
            const owner = await prisma.user.create({
                data:{
                    email:email,
                    name:name,
                    password:hashedPassword,
                    role:"THEATER_OWNER",
                    theaters:{
                        //@ts-ignore
                        create:{
                            name:theaterName,
                            location:location,
                        },
                    },
                },
            });
            return NextResponse.json(owner,{status:201});
            console.log("owner created");
            
        }
        else{
            //@ts-ignore
            const consumer = await prisma.user.create({
                data:{
                    email:email,
                    name:name,
                    password:hashedPassword,
                    role:"CONSUMER",

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
            error:'signup failed'+error
        }),{
            status:500,
        })
    }



    //create new user based on role

}
