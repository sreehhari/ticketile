
"use client"
import { useEffect,useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css'; 
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { useRouter } from "next/navigation";
//ts shit

interface Movie{
  id:number;
  title:string;
  posterUrl:string;
  description:string;
  
}
interface MovieCardProps{
  title:string;
  image:string;
  description:string;
  id?:number;
  // cinema:Movie[];
}
//icons


function ChevronLeftIcon(props:React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props:React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function StarIcon(props:React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
//fetching

const MovieList:React.FC=()=>{
  const[movies,setMovies]=useState<Movie[]>([]);
  const[error,setError]=useState<string | null>(null);

  useEffect(()=>{
    const fetchMovies = async()=>{
      try{
        const response = await fetch('/api/movies'); 
        if(!response.ok){
          throw new Error('failed to fetch movies');
        }
        const data:Movie[] = await response.json();
        // console.log(data)
        //@ts-expect-error-data'stype
        setMovies(data.data);
        // console.log(movies)
      }catch(err){
        console.error("error fetching movies ",err);
        setError('could not fetch movies');
      }
    }
    fetchMovies();
  },[]);

  return(
    
    <div className="mt-[250px] w-full max-w-6xl mx-auto py-8 flex items-center justify-center">
      {error ? (
         <div className="text-red-500">{error}</div>
      ):
      (
        <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {movies.map((movie)=>(
          <SwiperSlide key={movie.id}>
            <MovieCard
            id={movie.id}
            title={movie.title}
            image={movie.posterUrl}
            description={movie.description}
            />
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev">
        <ChevronLeftIcon className="w-8 h-8 text-white" />
        </div>
        <div className="swiper-button-next">
        <ChevronRightIcon className="w-8 h-8 text-white" />
        </div>
      </Swiper>
      
      )}
      </div>
      
  )

}
const MovieCard: React.FC<MovieCardProps> = ({ title, image, description,id })=>{
  const router = useRouter();
  const handleClick =()=>{
    router.push(`/movies/${id}`)
  }
  return (
    <div className="relative group cursor-pointer"
    onClick={handleClick}

    >
      <Image
        src={image}
        width={250}
        height={375}
        alt={title}
        className="rounded-lg object-cover w-full h-[375px]"
        style={{ aspectRatio: "250/375", objectFit: "cover" }}
      />
      <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="text-white text-2xl font-semibold">{title}</div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {/* <div className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 fill-primary" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
        </div> */}
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </div>
  );
}

export default MovieList;



