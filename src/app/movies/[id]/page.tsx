"use client"

import Image from "next/image"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// interface BookingProps{
//     id:number;
// }
interface Details{
    id:number;
    title:string;
    posterUrl:string;
    description:string;
    image:string;
    
  }

const Movies = ({params}:{params:{id:string}}) => {
    const{id}=params;
    const[details,setDetails]=useState<Details | null>(null)
    const[error,setError]=useState<string | null>(null);
    useEffect(()=>{
        const getDetails = async()=>{
            try{
                const response = await fetch(`/api/movies/${id}`);
                if(!response.ok){
                    throw new Error('failed to fetch the movie details');
                }
                const data:Details = await response.json();
                //@ts-expect-error-data'stype
                setDetails(data.data);
            }catch(err){
                console.error("error fetching the movie's details",err);
                setError('not able to fetch the details');
            }
        }
        // getDetails();
        if(id){
            getDetails();
        }
    },[id]);
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if(!details){
        <div>
            <h3>please wait</h3>
        </div>
    }
  return (
<div className="min-h-screen flex flex-row-reverse items-center justify-center">
  <div></div>
  <Card className="p-4 mt-[100px] w-[1600px] h-[900px] flex">
    {/* Left Side: Image */}
    <div className="w-1/2 p-4 flex items-center justify-center">
      <Image
        src={details?.posterUrl ?? 'https://i.pinimg.com/564x/2d/8a/73/2d8a732b48087dd34f9500b8eb2f4240.jpg'}
        width={500}
        height={750}
        alt={details?.title ?? 'something went wrong'}
        className="rounded-lg object-cover"
        style={{ aspectRatio: "250/375", objectFit: "cover" }}
      />
    </div>

    {/* Right Side: Form */}
    <div className="w-1/2 p-4">
      <CardHeader>
        <CardTitle>{details?.title}</CardTitle>
        <CardDescription>{details?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </div>
  </Card>
</div>

  )
}

export default Movies