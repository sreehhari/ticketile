import { useEffect, useState } from "react";

const SeatBooking = ({ movieId, theaterId, email }) => {
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
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      } finally {
        setLoading(false); // Always set loading to false in finally
      }
    };

    fetchBookedSeats();
  }, [movieId, theaterId]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) {
      return; 
    }

    // Toggle seat selection
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

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
          email,  
        }),
      });
  
      const data = await response.json(); // Ensure we parse the response as JSON
  
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
        className={`w-10 h-10 flex items-center justify-center border rounded cursor-pointer transition-colors duration-300 
          ${isBooked ? 'bg-red-600 text-white cursor-not-allowed' : isSelected ? 'bg-green-600 text-white' : 'bg-white'}`}
        onClick={() => handleSeatClick(seatId)}
        style={{ cursor: isBooked ? 'not-allowed' : 'pointer' }} // Change cursor based on booking status
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
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Select Seats</h2>
      <div className="grid grid-cols-10 gap-2 mb-4">
        {seatLayout.map((seatId) => renderSeat(seatId))}
      </div>
      <button
        onClick={handleBookingSubmit}
        disabled={selectedSeats.length === 0}
        className={`px-4 py-2 text-white rounded ${selectedSeats.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Book {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"}
      </button>
    </div>
  );
};

export default SeatBooking;
