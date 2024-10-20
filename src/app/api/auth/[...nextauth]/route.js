import NextAuth from "next-auth/next";
// import { PrismaClient } from "@prisma/client";
import {prisma} from "@/lib/prisma"
import { CredentialsProvider } from "next-auth/providers/credentials";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";

secret: process.env.NEXTAUTH_SECRET;
const handler = NextAuth(NEXT_AUTH_CONFIG);
export{handler as GET, handler as POST};



