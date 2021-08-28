const countriesContainer = document.querySelector(".countries");
const form = document.querySelector(".textInput");
const input = document.querySelector(".input");
const title = document.querySelector("h2");
const errorMessage = document.querySelector(".errorMessage");
let getJSON;
let countryData;
let res;
let data;
const renderError = function (msg) {
  const errorMsg = `
    <p class="errorMessage">${msg}</p>
  `;

  document.querySelector("body").insertAdjacentHTML("beforeend", errorMsg);
};

// Rendering country
const renderCountry = function (data) {
  const html = `

  <section class="country">
    <h1 class="first__title">${data.name} <span>(${data.nativeName})</span></h1>
    <img width="500" src="${data.flag}">
    <div class="data__info">
      <h3 class="h3">Native name: <span>${data.nativeName}</span></h3>
      <h3 class="h3">Abbreviation: <span>${data.alpha3Code}</span></h3>
      <h3 class="h3">Capital city: <span>${data.capital}</span></h3>
      <h3 class="h3">Area: <span>${
        data.area ? data.area / 1000 : 0
      }</span> km²</h3>
      <h3 class="h3">Region: <span>${data.region}</span></h3>
      <h3 class="h3">Subregion: <span>${data.subregion}</span></h3>
      <h3 class="h3">Languages: <span>${data.languages[0].name}, (${
    data.languages[0].nativeName
  })</span></h3>
  <h3 class="h3">Population: <span>${(data.population / 1000000).toFixed(
    1
  )} Million people</span></h3>
  <h3 class="h3 neighbour">Neighbour countrys: <span>
  ${
    data.borders.length > 0 ? [...data.borders] : "No countries found!"
  }</span></h3>
  <h3 class="h3">Currency: <span>${data.currencies[0].name} (${
    data.currencies[0].symbol
  })</span></h3>
  <h3 class="h3">Calling code: <span>"${[...data.callingCodes]}"</span></h3>
  <h3 class="h3">Top Level Domain: <span>"${data.topLevelDomain}"</span></h3>
  <h3 class="h3">Timezones: <span>${data.timezones}</span></h3>
  <h3 class="h3">Latitude and longitude: <span>(${data.latlng})</span></h3>
    </div>
  </section>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
};

// Window load event
window.addEventListener("load", function (e) {
  form.classList.add("formClass");
  title.classList.add("h2Animation");
});

// Submit event
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (input.value) {
    var inpValue = input.value;

    getJSON = async function (url) {
      try {
        res = await fetch(url);
        if (!res.ok) {
          renderError(
            `Country not found (${res.status})❌. \n please write leggal country name 😻. \n  Refresh website to write
            👐.`
          );
          form.style.top = "-100%";
          countriesContainer.remove();
        }

        data = await res.json();

        if (res.ok) {
          data.forEach((d) => {
            renderCountry(d);
          });
        } else {
          console.warn("Write leggal country name!");
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    getCountryData = async function () {
      try {
        const countries = await getJSON(
          `https://restcountries.eu/rest/v2/name/${inpValue}`
        );

        return countries;
      } catch (err) {
        console.error(err.message);
      }
    };
    getCountryData();
    form.classList.add("formBack");
    countriesContainer.classList.add("countriesAnimation");
    title.classList.add("h2Back");
    input.value = "";
    input.blur();
  }
});
