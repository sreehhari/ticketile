"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

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
import { useRouter } from "next/navigation";
export default function SignUpPage(){
    const [formData,setFormData]=useState({
        email:"",
        password:"",
        name:"",
        role:"CONSUMER",
        theaterName:"",
        location:"",
    });
    const[error,setError]=useState<String | null>(null);
    const router=useRouter();
   
    const handleinputchange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value,})
    };

    const handleRoleChange = (value:string)=>{
        setFormData({
            ...formData,
            role:value,
        });
    };

    
    const handleSignup=async(e:React.FormEvent)=>{
        e.preventDefault();
        setError(null);

        try{
            const response = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify(formData)
            });


            const result = await response.json();
            if(response.ok){
                //here we write the redirect logic .. like redirecting to homepage after a successful signup
                router.push("/");//[err]make this route to the homepage
            }else{
                setError(result.error || "signup failed");
            }
        }
        catch (err){
            setError("an error has occurred while signing up")
        }

    };
//     type RoleType = 'owner' | 'consumer' | '';
// const[role,setRole]=useState<RoleType>("");


    return (
        <>
        <div className="min-h-screen flex items-center justify-center">
           <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Username</Label>
              <Input name="email" placeholder="example@gmail.com" type="email" value={formData.email} onChange={handleinputchange} required/>
              <Label htmlFor="password">Passowrd</Label>
              <Input name="password" placeholder="*******" type="password" value={formData.password} onChange={handleinputchange} required></Input>
              <Label htmlFor="name">Name</Label>
              <Input name="name" placeholder="enter name" type="text" value={formData.name} onChange={handleinputchange} required></Input>              
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select name="role" onValueChange={handleRoleChange} value={formData.role}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="owner">Theater owner</SelectItem>
                  <SelectItem value="consumer">User</SelectItem>
                 
                </SelectContent>
              </Select>
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

            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" onClick={handleSignup}>Signup</Button>
      </CardFooter>
    </Card>
        
    </div>
        </>

    )
}