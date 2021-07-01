'use strict';

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

//Get data from local storage and populate UI
const populateUI = function () {
  //...pull seat selection
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  //...pull selected movie
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = localStorage.getItem('selectedMoviePrice');
  }
};

//Update Total and Count
const updateSelectedCount = function () {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  //copy selected seats into an array, then map through the array return a new array of indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  //store the array to local storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  //display selected seats and cost
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

//Initialize count,total & selected seats
populateUI();
updateSelectedCount();

//Save selected movie index & price
const setMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

//Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seat click event
container.addEventListener('click', e => {
  if (
    //seat is unoccupied
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    //change to selected & update count,total
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
