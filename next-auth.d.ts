import nextAuth, { DefaultSession } from "next-auth";

declare module "next-auth"{
    interface User{
        id:number;
        role?:string;
    }

    interface Session{
        user:{
            id:number;
            role?:string;

        }&DefaultSession["user"];
    }
}