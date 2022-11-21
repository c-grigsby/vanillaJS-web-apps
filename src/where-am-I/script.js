'use strict';
// AsyncJS
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '', city = '') {
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
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

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
    ).then((data) => data.json());

    // Country data from REST API
    const countryData = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    ).then((data) => data.json());

    // Neighbor Country data (from country code)
    const neighbor = countryData[0].borders[0];
    const neighborData = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${neighbor}`
    ).then((data) => data.json());

    // Display the data
    renderCountry(countryData[0], '', dataGeo.city);
    renderCountry(neighborData, 'neighbor');
  } catch (err) {
    console.log(`${err.message}💥`);
    renderError(err.message);
  }
};

btn.addEventListener('click', whereAmIAt);
