'use strict';

// ASYNCHRONOUS JAVASCRIPT: PROMISES, ASYNC, AND AJAX

// GoTo GitHub - public-apis
// for access to tons of APIs

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//Helper Method(See Below)
const renderCountry = function (data, className = '', city = '') {
  //const location = `${data.city}`;
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
            ${
              city.length > 0
                ? `<p class="country__row"><span>🌇</span>${city}</p>`
                : ''
            }
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// Error Handling
const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

////////////////////////////////////
// OUR FIRST AJAX CALL: XMLhttp request

// Old School Way

// Step 1)
// const request = new XMLHttpRequest();

// // Note: on GitHub 'public-apis'
// // Make sure the API has CORS
// // Cross Origin Source-sharing
// // We are using REST Countries; via RESTful API

// // Step 2)
// request.open('GET', 'https://restcountries.eu/rest/v2/name/portugal');

// // Step 3)
// request.send(); //will send the request

// // Step 4)
// request.addEventListener('load', function () {
//   //console.log(this.responseText);
//   //we will get a response in JSON, which is essentially a big string of text

//   // Step 5) convert the object
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);
//   console.log(data.population);

//   const html = `
//   <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// });

////////////////////////////////////////
////// AJAX ALL IN ONE FUNCTION

// const getCountryData = function (country) {
//   // Step 1)
//   const request = new XMLHttpRequest();

//   // Step 2)
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

//   // Step 3)
//   request.send();

//   // Step 4)
//   request.addEventListener('load', function () {
//     // Step 5) convert the object
//     const [data] = JSON.parse(this.responseText);

//     const html = `
//   <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} million people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('france');

/////////////////////////////////
// WELCOME TO CALLBACK HELL

//suppose we want data on a country and its neighbor to displayed in order...

// const renderCountry = function (data, className = '') {
//   const html = `
//   <article class="country ${className}">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} million people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getCountryAndNeighbor = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     //Render Country1
//     renderCountry(data);

//     //Get neighbour country 2
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();

//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);

//     request2.send();

//     request2.addEventListener('load', function () {
//       //the code does not return an arr, no destructuring
//       const data2 = JSON.parse(this.responseText);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// //getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');

//////////////////////////////////////////
// Promises and the FETCH API

// Modern Way of making AJAX calls: the FETCH API

// Below: Old Way

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);

// NEW WAY: for 'GET' request, just pass the URL
// const request2 = fetch(`https://restcountries.eu/rest/v2/name/portugal`);
// console.log(request2);

// var request: becomes the 'promise'

// WHAT IS A PROMISE?

// Promise: An object used as a placeholder for the future result of an asynchronous operation...OR...simply a container for a future value

// Response from an AJAX call

// You can chain promises and escape callback hell

// States of promises: Pending -> Settled -> Fullfilled or Rejected

/////////////////////////////////////////
// Consuming Promises (WAY BETTER)

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`) // the first promise
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //new promise
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

//CLEANED UP VERSION

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`) // the first promise
//     .then(response => response.json()) //new promise
//     .then(data => renderCountry(data[0]));
// };

// getCountryData('portugal');

//////////////////////////////////////
// CHAINING PROMISES

//get the neighbor country as well

// //Helper Method(See Below)
// const renderCountry = function (data, className = '') {
//   const html = `
//   <article class="country ${className}">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} million people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// // Get Country Data Using JSON
// const getCountryAndNeighborData = function (country) {
//   //Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`) //calls the REST API, 1st promise
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbor = data[0].borders[0];
//       if (!neighbor) return;
//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data2 => renderCountry(data2, 'neighbor'));
// };

// btn.addEventListener('click', function () {
//   getCountryAndNeighborData('germany');
// });

//////////////////////////////////////
// Handlind Errors in Promises

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentHTML('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

//Using the FETCH API
// const getCountryAndNeighborData = function (country) {
//   //Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`) //calls the REST API, 1st promise
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbor = data[0].borders[0];
//       if (!neighbor) return;
//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data2 => renderCountry(data2, 'neighbor'))
//     .catch(err => {
//       renderError(`Something went wrong💥. ${err.message}. Try again.`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryAndNeighborData('spain');
// });

///////////////////////////////////////
//////////////////////////////////////
// Lecture

//////////////////////////////////////
// Asynchronous JS, AJAX and APIs

// What is synchronous code?

// Synchronous Code: code is executed line by line, each line must WAIT on the previous line of code to be executed before the program can continue, IS BLOCKING

// setTimeout is asynchronous

// Asynchronous Code: is executed AFTER a task that runs in the "background" finishes, IS NON-BLOCKING, execution for the rest of the program DOES NOT wait for the asynchronous task to finish its work

// Asynchronous: Not occuring at the same time

// Coordinating behavior of a program over a period of time

// WHAT ARE AJAX CALLS?

// Asynchronous JavaScript And XML (AJAX): Allows us to communicate with remote web servers in an asynchronous way. With AJAX calls, we can request data from web servers dynamically. (without reloading the page)

// Usually to request data from a web API

// WHAT IS A WEB API?

// Application Programming Interface: A piece of software that can be used by another piece of software, in order to allow applications to talk to each other.

// There are MANY APIs

// Like the DOM API, Own Class API, Geolocation API, etc.

// Perhaps most relevate "Online" API (/Web API/API)

// "Online" API: Application running on a server that recieves requests for data, and sends data back as a response

// We can build our own APIs (requires back-end development, e.g with NodeJS) or...

// * use 3rd-pary APIs

// There is an API for EVERYTHING

// VERY POPULAR

// AJAX -> XML not used anymore

// JSON is the most popular data format for APIs

/////////////////////////////////
// Challenge

//Reverse Geocoding

// const whereAmI = function (latt, longitude) {
//   fetch(`https://geocode.xyz/${latt},${longitude}?geoit=json`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}!`);

//       getCountryAndNeighborData(data.country);
//     })
//     .catch(err => console.log(err.message));
// };

// The call back

// btn.addEventListener('click', function () {
//   whereAmI('-33.933', '18.474');
// });

////////////////////////////////////////////
// Consuming Promises with ASYNC/AWAIT

// //Promisifying the geolocation API
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // Version 2.0...come back to add neighboring country
// const whereAmIAt = async function (country) {
//   const pos = await getPosition();
//   const { latitude: lat, longitude: long } = pos.coords;

//   // Reverse geocoding API
//   const dataGeo = await fetch(
//     `https://geocode.xyz/${lat},${long}?geoit=json`
//   ).then(data => data.json());
//   //const dataGeo = await resGeo.json();

//   console.log(dataGeo);

//   // Country data from REST API
//   const res = await fetch(
//     `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//   );
//   const data = await res.json();

//   // Neighbor Country data (from country code)
//   const neighbor = data[0].borders[0];
//   const res2 = await fetch(
//     `https://restcountries.eu/rest/v2/alpha/${neighbor}`
//   );
//   const data2 = await res2.json();

//   // Display the data
//   renderCountry(data[0]);
//   renderCountry(data2, 'neighbor');
// };
// whereAmIAt();

// console.log('FIRST CALL BACK');

//////////////////////////////////////////////////
// SIMPLIFIED VERSION_

//Location & Statistics_WORKING WITH APIs

// Version 2.0...

//Promisifying the geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmIAt = async function (country) {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;

    // Reverse geocoding API
    const dataGeo = await fetch(
      `https://geocode.xyz/${lat},${long}?geoit=json`
    ).then(data => data.json());

    // Country data from REST API
    const countryData = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    ).then(data => data.json());

    // Neighbor Country data (from country code)
    const neighbor = countryData[0].borders[0];
    const neighborData = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${neighbor}`
    ).then(data => data.json());

    // Display the data
    renderCountry(countryData[0], '', dataGeo.city);
    renderCountry(neighborData, 'neighbor');
  } catch (err) {
    console.log(`${err.message}💥`);
    renderError(err.message);
  }
};

btn.addEventListener('click', whereAmIAt);

// ///////////////////////////////////////
// // RUNNING PROMISES IN PARALLEL

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c1}`
//     // );

//     // const [data2] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c2}`
//     // );

//     // const [data3] = await getJSON(
//     //   `https://restcountries.eu/rest/v2/name/${c3}`
//     // );

//     const data = await Promise.all([
//       getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),

//       getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),

//       getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]); //will return a NEW promise, and execute all of these at the same time IN PARALLEL

//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.log(err);
//   }
// };

// get3Countries('usa', 'russia', 'germany');
