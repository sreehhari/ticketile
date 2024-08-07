import { Button } from "@/components/ui/button";
import Image from "next/image";
import Cards from "@/components/carousel/carousel";

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center min-h-screen" >
      <div className="w-full max-w-2xl">
    <Cards/>
    </div>

    </div>
    
    
    </>
  );
}
