const coachLayout = document.getElementById("coachLayout");
const reserveBtn = document.getElementById("reserveBtn");
const numSeatsInput = document.getElementById("numSeats");
const resultDiv = document.getElementById("result");

// Initialize seat availability data (80 seats)
const seatAvailability = Array(80).fill(true);

reserveBtn.addEventListener("click", () => {
    const numSeats = parseInt(numSeatsInput.value);
    if (numSeats > 0 && numSeats <= 7) {
        const bookedSeats = bookSeats(numSeats);
        if (bookedSeats.length > 0) {
            displayCoachLayout();
            resultDiv.textContent = `Booked seats: ${bookedSeats.join(", ")}`;
        } else {
            resultDiv.textContent = "Seats not available.";
        }
    } else {
        resultDiv.textContent = "Please enter a valid number of seats (1-7).";
    }
});

function bookSeats(numSeats) {
    const bookedSeats = [];
    let consecutiveSeats = 0;

    for (let i = 0; i < seatAvailability.length; i++) {
        if (seatAvailability[i]) {
            consecutiveSeats++;
            if (consecutiveSeats === numSeats) {
                for (let j = i - numSeats + 1; j <= i; j++) {
                    seatAvailability[j] = false;
                    bookedSeats.push(j + 1);
                }
                break;
            }
        } else {
            consecutiveSeats = 0;
        }
    }

    return bookedSeats;
}

function displayCoachLayout() {
    coachLayout.innerHTML = "";

    for (let i = 0; i < seatAvailability.length; i++) {
        const seat = document.createElement("div");
        seat.className = "seat";

        if (!seatAvailability[i]) {
            seat.classList.add("booked");
        }

        seat.textContent = i + 1;
        coachLayout.appendChild(seat);
    }
}

// Initial display of coach layout
displayCoachLayout();
