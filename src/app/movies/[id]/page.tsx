"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Details {
  id: number
  title: string
  posterUrl: string
  description: string
  image: string
  name: string
}

interface MovieTheater {
  name: string
  id: string
}

const SeatBooking = ({ movieId, theaterId, email }: { movieId: string, theaterId: string | null, email: string }) => {
  const [bookedSeats, setBookedSeats] = useState<number[]>([])
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!theaterId) return
      try {
        const response = await fetch(`/api/booked-seats?movieId=${movieId}&theaterId=${theaterId}`)
        const data = await response.json()
        if (response.ok) {
          setBookedSeats(data.bookedSeats)
        } else {
          console.error("Failed to fetch booked seats:", data.message)
        }
      } catch (error) {
        console.error("Error fetching booked seats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookedSeats()
  }, [movieId, theaterId])

  const handleSeatClick = (seatId: number) => {
    if (bookedSeats.includes(seatId)) {
      return
    }

    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]
    )
  }

  const handleBookingSubmit = async () => {
    if (!theaterId) return
    try {
      const response = await fetch(`/api/book-seats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          theaterId,
          seats: selectedSeats,
          email,
        }),
      })
  
      const data = await response.json()
  
      if (response.ok) {
        alert(data.message || "Booking successful!")
        setSelectedSeats([])
        setBookedSeats(prev => [...prev, ...selectedSeats])
      } else {
        console.error("Failed to book seats:", data.message)
        alert(data.message || "Failed to book seats")
      }
    } catch (error) {
      console.error("Error booking seats:", error)
      alert("An error occurred while booking seats. Please try again.")
    }
  }
  
  const renderSeat = (seatId: number) => {
    const isBooked = bookedSeats.includes(seatId)
    const isSelected = selectedSeats.includes(seatId)

    return (
      <div
        key={seatId}
        className={`w-10 h-10 flex items-center justify-center border rounded cursor-pointer transition-colors duration-300 
          ${isBooked 
            ? 'bg-red-600 text-white cursor-not-allowed' 
            : isSelected 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        onClick={() => handleSeatClick(seatId)}
        style={{ cursor: isBooked ? 'not-allowed' : 'pointer' }}
      >
        {seatId}
      </div>
    )
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const seatLayout = Array.from({ length: 90 }, (_, index) => index + 1)

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Select Seats</h2>
      <div className="grid grid-cols-10 gap-2 mb-4">
        {seatLayout.map((seatId) => renderSeat(seatId))}
      </div>
      <Button
        onClick={handleBookingSubmit}
        disabled={selectedSeats.length === 0}
        variant="default"
      >
        Book {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"}
      </Button>
    </div>
  )
}

export default function Movies({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: session, status } = useSession()
  const [email, setEmail] = useState<string>("")
  const [booking, setBooking] = useState(false)
  const [details, setDetails] = useState<Details | null>(null)
  const [theaters, setTheaters] = useState<MovieTheater[]>([])
  const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`)
        if (!response.ok) {
          throw new Error('failed to fetch the movie details')
        }
        const data = await response.json()
        setDetails(data.data.movie)
        setTheaters(data.data.theaters)
        if (status === "authenticated") {
          setEmail(session.user?.email ?? "")
        }
      } catch (err) {
        console.error("error fetching the movie's details", err)
        setError('not able to fetch the details')
      }
    }
  
    if (id) {
      getDetails()
    }
  }, [id, status, session?.user?.email])

  const handleTheaterChange = (value: string) => {
    setSelectedTheaterId(value)
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!details) {
    return <div><h3>Please wait</h3></div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <Image
              src={details.posterUrl ?? 'https://i.pinimg.com/564x/2d/8a/73/2d8a732b48087dd34f9500b8eb2f4240.jpg'}
              width={300}
              height={450}
              alt={details.title ?? 'Movie poster'}
              className="rounded-lg object-cover"
              style={{ aspectRatio: "2/3", objectFit: "cover" }}
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <CardHeader>
              <CardTitle>{details.title}</CardTitle>
              <CardDescription>{details.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="theater">Theater</Label>
                    <Select onValueChange={handleTheaterChange}>
                      <SelectTrigger id="theater">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {theaters.map((theater) => (
                          <SelectItem
                            value={theater.id.toString()}
                            key={theater.id}
                          >
                            {theater.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                onClick={() => setBooking(true)}
                disabled={!selectedTheaterId}
              >
                Book Seats
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
      {booking && selectedTheaterId && (
        <div className="mt-8 w-full max-w-4xl">
          <SeatBooking
            movieId={id}
            theaterId={selectedTheaterId}
            email={email}
          />
        </div>
      )}
    </div>
  )
}