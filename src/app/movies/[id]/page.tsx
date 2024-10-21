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
// import { threadId } from "worker_threads";

// interface BookingProps{
//     id:number;
// }
interface Details{
    id:number;
    title:string;
    posterUrl:string;
    description:string;
    image:string;
    name:string;
    
  }



interface movieTheaters{
  name:string;
  id:string;
}

const Movies = ({params}:{params:{id:string}}) => {
    const{id}=params;
    const[details,setDetails]=useState<Details | null>(null);
    const[theaters,setTheaters]=useState<movieTheaters[]>([]);
    const[theaterId,setTheaterId]=useState<number | null>(null)
    const[error,setError]=useState<string | null>(null);
    const[showTimes,setShowTimes]=useState<string[]>([]);
    useEffect(()=>{
        const getDetails = async()=>{
            try{
                const response = await fetch(`/api/movies/${id}`);
                if(!response.ok){
                    throw new Error('failed to fetch the movie details');
                }
                const data:Details = await response.json();
                //@ts-expect-error-data'stype
                setDetails(data.data.movie);
                 //@ts-expect-error-data'stype
                setTheaters(data.data.theaters);
                // console.log("these are the theaters:",theaters)

            }catch(err){
                console.error("error fetching the movie's details",err);
                setError('not able to fetch the details');
            }
        }
      
        if(id){
            getDetails();
        }


    },[id]);
   

    // const handleTheaterChange=async(value:string)=>{
    //   const selectedTheaterId = parseInt(value);
    //   console.log("this is the theater id :",selectedTheaterId)
    //   setTheaterId(selectedTheaterId);
    //   if(selectedTheaterId){
    //     try{
    //       const response = await fetch(`/api/fetchTimings?movieId=${id}&theaterId=${selectedTheaterId}`)
    //       if (!response.ok) {
    //         throw new Error("Failed to fetch showtimes");
    //       }
    //       const data = await response.json();
    //       setShowTimes(data.showTimes);

    //       console.log("these are the showtimes:",showTimes);

    //     }catch(err){
    //       console.error("Error fetching showtimes:", err);
    //       setError("Could not fetch showtimes");
    //     }
    //   }else{
    //     setError("Please select a theater");
    //   }
     
    // };
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
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Theater</Label>
              <Select>
                <SelectTrigger id="theater">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  
                  {
                    theaters.map((theater)=>(
                      <SelectItem
                      value={theater.id.toString()}
                      key={theater.id}>{theater.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="seats">Seats</Label>
              <Select>
                <SelectTrigger id="seats">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">Sigma</SelectItem>
                  <SelectItem value="2">Couple</SelectItem>
                  <SelectItem value="3">Fam</SelectItem>
                  <SelectItem value="4">4 people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            
          
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Book</Button>
      </CardFooter>
    </div>
  </Card>
</div>

  )
}

export default Movies