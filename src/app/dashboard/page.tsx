"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react"
import { useSession } from "next-auth/react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectGroup, SelectLabel, Value } from "@radix-ui/react-select"

export default function Dashboard() {
  interface MovieDetails{
    name:string;
    date: Date | null;
    description:string  | undefined;
    showtime:string | null;
    posterUrl:string | undefined;
    ownerId:number | undefined;

  }
  const[error,setError]=useState<string | null>(null);
  const {data:session,status}=useSession();
  


    // const [date, setDate] = useState<Date>();
    // const [movie,setMovie] = useState("");
    const [movieDetails,setMovieDetails]=useState<MovieDetails>({
      name:"",
      date:null,
      description:undefined,
      showtime:null,
      posterUrl:undefined,
      ownerId:session?.user?.id,

    })
    const handleinputchange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
      setMovieDetails({...movieDetails,[e.target.name]:e.target.value,})

      console.log({
        ...movieDetails,
      });
  };
    const handleDeploy=async(e:React.FormEvent)=>{
      e.preventDefault();
      setError(null);

      if(!movieDetails.name.trim()){
        setError("movie name is required");
        return;
      }
      if(!movieDetails.date){
        setError("date not set");
        return;
      }

      try{
        const response = await fetch("/api/dashboard",{
          method:"POST",
          headers:{
            "Content-type":"application/json",

          },
          body:JSON.stringify(movieDetails)
        });
        const result = await response.json();
        if(response.ok){
          console.log("successfully added movie");
        }else{
          setError(result.error || 'adding movie failed')
        }
      }catch(err){
        console.error("this is the error :",err)
        setError("an error has occurred while tryna add movie")
      }
    }
  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Movie</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDeploy}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="movieDetails">Name</Label>
              <Input name="name"  value={movieDetails.name} onChange={handleinputchange} placeholder="Name of the movie" />
              
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="movieDetails">Description</Label>
              <Input name="description" value={movieDetails.description} onChange={handleinputchange} placeholder="Give a description" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="movieDetails">Poster URL</Label>
              <Input name="posterUrl" value={movieDetails.posterUrl} onChange={handleinputchange} placeholder="Paste the link" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="showtime">Showtime</Label>
              {/* <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select> */}
              <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !movieDetails.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {movieDetails.date ? format(movieDetails.date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setMovieDetails((prevDetails)=>({
              ...prevDetails,
              date:addDays(new Date(),parseInt(value))
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={movieDetails.date instanceof Date ? movieDetails.date : undefined} onSelect={(selectedDate)=>
            setMovieDetails((prevDetails)=>({
              ...prevDetails,
              date:selectedDate || null,
            }))
          } />
        </div>
      </PopoverContent>
    </Popover>
    <Select onValueChange={(value)=>
      setMovieDetails((prevDetails)=>({
        ...prevDetails,
        showtime:value
      }))
    }>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="select showtime"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Showtime</SelectLabel>
          <SelectItem value="morning">6:30am-9:30am</SelectItem>
          <SelectItem value="noon">12:30pm-3:30pm</SelectItem>
          <SelectItem value="night">9:30pm-12:30am</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

            </div>
            {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline" onClick={()=>{
          setMovieDetails({
            name:"",
            date:null
          })||setError(null)
        }}>Cancel</Button> */}
        <Button type="submit" onClick={handleDeploy}>Deploy</Button>
      </CardFooter>
    </Card>
    </div>

    </>
)

}

