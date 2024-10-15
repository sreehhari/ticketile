import { Button } from "@/components/ui/button";
import Image from "next/image";
import Cards from "@/components/carousel/carousel";
import MovieList from "@/components/carousel/carousel";
export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center min-h-screen" >
    {/* <Cards/> */}
    <MovieList/>
    {/* <Image
      src="https://images.unsplash.com/photo-1727873817701-8cd132afbb01?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      width={500}
      height={500}
      alt="heisenberg"
    /> */}

    </div>
    
    
    </>
  );
}
