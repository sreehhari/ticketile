import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers/credentials";
const handler = NextAuth({
    providers:[
        
    ]
})

export const GET = handler;
export const POST = handler