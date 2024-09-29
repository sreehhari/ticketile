"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";  


export default function SignIn(){
    const router = useRouter();
    const[formData,setFormData]=useState({
        email:"",
        password:""
    });
    const handleinputchange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value,})
    };
    return (
     <>
     <div className="min-h-screen flex flex-col items-center justify-center">
           <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Username</Label>
              <Input name="email" placeholder="example@gmail.com" type="email" value={formData.email} onChange={handleinputchange} required/>
              <Label htmlFor="password">Passowrd</Label>
              <Input name="password" placeholder="*******" type="password" value={formData.password} onChange={handleinputchange} required></Input>
            </div>
            {/* <div className="flex flex-col space-y-1.5">
              
              {formData.role==='owner'&&(
                <>
                <div>
                    <Label htmlFor="theaterName">Theater Name</Label>
                    <Input id="theaterName"
                     name="theaterName" 
                     type="text"
                      placeholder="Enter theater name"
                      value={formData.theaterName}
                      onChange={handleinputchange}
                      required></Input>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location"
                  name="location"
                  type="text"
                  placeholder="enter the theater location"
                  value={formData.location}
                  onChange={handleinputchange}
                  required></Input>
                </div>
                </>
              )}

            </div> */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" onClick={async()=>{
            const res = await signIn("credentials",{
                email:formData.email,
                password:formData.password
            });
            console.log(res);
            router.push("/")
        }}>SignIn</Button>
      </CardFooter>
    </Card>
  
        
    </div>
     </>




    )
}