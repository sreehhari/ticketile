/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Yc9nFha9Njl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

export default function Cards() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <Carousel className="w-full">
        <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <CarouselItem>
            <div className="relative group cursor-pointer">
              <img
                src="/perfectblue.jpg"
                width={250}
                height={375}
                alt="Perfect Blue"
                className="rounded-lg object-cover w-full h-[375px]"
                style={{ aspectRatio: "250/375", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-2xl font-semibold">Movie Title</div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Perfect Blue</h3>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-primary" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-muted-foreground">(125 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                A brief synopsis of the movie, showcasing the plot, characters, and overall theme.
              </p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative group cursor-pointer">
              <img
                src="/inception.jpg"
                width={250}
                height={375}
                alt="Inception"
                className="rounded-lg object-cover w-full h-[375px]"
                style={{ aspectRatio: "250/375", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-2xl font-semibold">Inception</div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Inception</h3>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-primary" />
                <span className="text-sm font-medium">4.5</span>
                <span className="text-sm text-muted-foreground">(92 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                A brief synopsis of the movie, showcasing the plot, characters, and overall theme.
              </p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative group cursor-pointer">
              <img
                src="/seven.jpg"
                width={250}
                height={375}
                alt="Movie Poster"
                className="rounded-lg object-cover w-full h-[375px]"
                style={{ aspectRatio: "250/375", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-2xl font-semibold">Seven</div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Seven</h3>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-primary" />
                <span className="text-sm font-medium">4.2</span>
                <span className="text-sm text-muted-foreground">(78 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                A brief synopsis of the movie, showcasing the plot, characters, and overall theme.
              </p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative group cursor-pointer">
              <img
                src="/howl.jpg"
                width={250}
                height={375}
                alt="Movie Poster"
                className="rounded-lg object-cover w-full h-[375px]"
                style={{ aspectRatio: "250/375", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-2xl font-semibold">Howl's Moving Castle</div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Howl's Moving Castle</h3>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-primary" />
                <span className="text-sm font-medium">4.7</span>
                <span className="text-sm text-muted-foreground">(105 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                A brief synopsis of the movie, showcasing the plot, characters, and overall theme.
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <ChevronLeftIcon className="w-8 h-8 text-white" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <ChevronRightIcon className="w-8 h-8 text-white" />
        </CarouselNext>
      </Carousel>
    </div>
  )
}

function ChevronLeftIcon(props) {
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
  )
}


function ChevronRightIcon(props) {
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
  )
}


function StarIcon(props) {
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
  )
}