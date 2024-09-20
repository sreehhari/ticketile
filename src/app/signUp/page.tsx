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
export default function SignUpPage(){
    type RoleType = 'owner' | 'consumer' | '';
const[role,setRole]=useState<RoleType>("");


    return (
        <>
        <div className="min-h-screen flex items-center justify-center">
           <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="example@gmail.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value)=>setRole(value as RoleType)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="owner">Theater owner</SelectItem>
                  <SelectItem value="consumer">User</SelectItem>
                 
                </SelectContent>
              </Select>
              {role==='owner'&&(
                <div>
                    <Label htmlFor="theatername">Theater Name</Label>
                    <Input id="theatername"
                     name="theatername" 
                     type="text"
                      placeholder="Enter theater name"
                      required></Input>
                </div>
              )}

            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Signup</Button>
      </CardFooter>
    </Card>
        
    </div>
        </>

    )
}