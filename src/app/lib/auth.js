import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
// import { cookies } from "next/headers";
// import { Providers } from "../providers";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();


export const NEXT_AUTH_CONFIG = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{label:"Username",type:"text",placeholder:"yourgmail@gmail.com"},
                password:{label:"Password",type:"password",placeholder:"not 123"}
            },
            async authorize(credentials){
                if(!credentials){
                    return null;
                }
                const {username: email, password } = credentials;
                const user = await prisma.user.findUnique({
                    where :{email:email,
                    },
                });
                if(!user){
                    throw new Error("no user found with that email check your email and try again");

                }
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if(!isPasswordValid){
                    throw new Error("invalid password");
                }
                //if everything is good then we return the user details to the jwt token section where a token with these deatais is made for the user
                
                return{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role, //we fetch the role and other details of the user from the database
                };
            }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({token,user}){
            //here we persist the role of the user using jwt tokens
            if(user){
                token.role=user.role;
            }
            return token;
        },
        async session({session,token}){
            //here we assign the role from the token to the session object
            if(token?.role){
                session.user.role=token.role;
            }
            return session;
        }
    },
     
};
