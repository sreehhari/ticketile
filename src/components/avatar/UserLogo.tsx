"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function UserLogo(){
    return(
        <Avatar>
          <AvatarImage src='/cat.jpg' alt="cat"/>
          <AvatarFallback>S</AvatarFallback>
        </Avatar>


    )
}
