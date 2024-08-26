"use client";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function SignUp(){
    return(
        <Button>
            <Link href="/api/auth/signup">Sign-Up</Link>
        </Button>
    )
}