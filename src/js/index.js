
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //all puts them in a node list or array
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;


//*First pull in all the DOM elements then we need each of these inputs
//*Second add our event listener to whole containers so when you click on seat, change class to select it and turn to blue, remember seats are like an array or nodelist
//*Third create if statement that checks what we clicked has a class of seat but not of occupied, if so we are going to add a class of 'selected' with toggle method
//*Fourth add the method toggle so that when it is clicked it turns class of 'selected' on and makes it blue, then we call below updateSelectedCount
//*Fifth add updateSelectedCount function to grab all seats selected, find the length of seats selected, put it into selectedSeatsCount variable and set innerText of count element and total elements to count times ticket price
//*Sixth take movieSelect element which is a list and add event listener, there is no click event but a change event for when you update the movie
//*Seventh implement local storage we need to basically create an array of indexes, use spread operator
//*Eight need to add localStorage functionality to updateSelectedCount function
//*Ninth go to movie select event and add setMovieDate to get movie we selected saved onto local storage
//*Tenth create populateUi function for saved data from local storage to populate onto UI
//*Eleventh will check to see if there are any seats in local storage and then loop through


//Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); //puts all selected seats into a nodelist

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); //Copy selected seats into arr, map through similar to for each but returns an arr, return new arr of indexes

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); //we are saving an arr selectedSeats is key, value is seatsIndex, since seatsIndex is an arr have to wrap it in JSON.stringify

    const selectedSeatsCount = selectedSeats.length; //length property gets number of items in an array or nodelist

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) { //check if anything is in localStorage & and empty arr so use arr length > 0 to check
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) { //check to see if selectedSeats index is greater than 1, indexOf gives you -1 when nothing is in the arr
                seat.classList.add('selected'); //if arr is present in localStorage take seat and add a class
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex'); //take selectedMovieIndex which is movie dropdown menu, set a variable equal to localStorage to get item of selectedMovieIndex

    if (selectedMovieIndex !== null) { //if it is in localStorage take movieSelect element and set to whatever selectedMovideIndex is in localStorage
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value); //selectedIndex will give us index of movie selected and the price which is the value
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Initial count and total set, updates both count and total
updateSelectedCount();