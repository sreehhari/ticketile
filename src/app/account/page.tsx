"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
const Account = () => {
    const {data:session,status}=useSession();
    const[name,setName]=useState("hashhs");
    useEffect(()=>{
        if(status === "authenticated"){
            setName(session.user?.name ?? "");
    
        }
    },[status,session]);
  
  return (
    <>
    <div className="container mx-auto px-4 mt-28">
    <div>
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
    Account    
    </h3>    
    <br />
    <h3>Name:{name}</h3>
    </div>


    </div>    
    </>
)
}

export default Account