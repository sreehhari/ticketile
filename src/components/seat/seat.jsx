import { useEffect, useState } from "react";

const SeatBooking = ({ movieId, theaterId,email }) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await fetch(`/api/booked-seats?movieId=${movieId}&theaterId=${theaterId}`);
        const data = await response.json();
        if (response.ok) {
          setBookedSeats(data.bookedSeats);
        } else {
          console.error("Failed to fetch booked seats:", data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booked seats:", error);
        setLoading(false);
      }
    };

    fetchBookedSeats();
  }, [movieId, theaterId]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      return; // Prevent selecting already booked seats
    }

    // Toggle seat selection
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // const handleBookingSubmit = async () => {
  //   try {
  //     const response = await fetch(`/api/book-seats`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         movieId,
  //         theaterId,
  //         seats: selectedSeats,
  //       }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       alert("Booking successful!");
  //       setSelectedSeats([]); // Clear selected seats after booking
  //     } else {
  //       console.error("Failed to book seats:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error booking seats:", error);
  //   }
  // };
  const handleBookingSubmit = async () => {
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
          email,  // Ensure userId is passed correctly
        }),
      });
  
      // Check for successful response
      const data = await response.json();  // Ensure we parse the response as JSON
  
      if (response.ok) {
        alert(data.message || "Booking successful!");
        setSelectedSeats([]); // Clear selected seats after booking
      } else {
        console.error("Failed to book seats:", data.message);
        alert(data.message || "Failed to book seats");
      }
    } catch (error) {
      console.error("Error booking seats:", error);
      alert("An error occurred while booking seats. Please try again.");
    }
  };
  
  const renderSeat = (seatId) => {
    const isBooked = bookedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    return (
      <div
        key={seatId}
        className={`seat ${isBooked ? "booked" : isSelected ? "selected" : ""}`}
        onClick={() => handleSeatClick(seatId)}
      >
        {seatId}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Assuming 90 seats (based on your schema), numbered 1 to 90
  const seatLayout = Array.from({ length: 90 }, (_, index) => index + 1);

  return (
    <div>
      <h2>Select Seats</h2>
      <div className="seat-layout">
        {seatLayout.map((seatId) => renderSeat(seatId))}
      </div>
      <button onClick={handleBookingSubmit} disabled={selectedSeats.length === 0}>
        Book {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"}
      </button>

      {/* Some basic CSS to help visualize the seats */}
      <style jsx>{`
        .seat-layout {
        
          display: grid;
          grid-template-columns: repeat(10, 40px);
          gap: 10px;
          margin: 20px 0;
        }

        .seat {
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff;
        }

        .seat.booked {
          background-color: red;
          color: #fff;
          cursor: not-allowed;
        }

        .seat.selected {
          background-color: green;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default SeatBooking;
