"use client"

import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import Image from "next/image"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <div>
        <div className="flex flex-row">
        <div>
            <Image
            src={details?.posterUrl ?? 'https://i.pinimg.com/564x/2d/8a/73/2d8a732b48087dd34f9500b8eb2f4240.jpg'}
            width={500}
            height={750}
            alt={details?.title ?? 'something went wrong'}
            className="rounded-lg object-cover w-full h-[375px]"
            style={{ aspectRatio: "250/375", objectFit: "cover" }}
            />
        </div>
        <div>

        </div>
        <div>

        </div>
        </div>




    </div>
  )
}

export default Movies