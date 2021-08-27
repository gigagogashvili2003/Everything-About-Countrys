const countriesContainer = document.querySelector(".countries");
const form = document.querySelector(".textInput");
const input = document.querySelector(".input");

// Windo load event

window.addEventListener("load", function (e) {
  form.classList.add("formClass");
  console.log("hello");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inpValue = input.value;

  const getJSON = async function (url) {
    const res = await fetch(url);

    const data = await res.json();

    data.forEach((d) => {
      renderCountry(d);
      console.log(d);
    });
  };

  const getCountryData = async function () {
    const countries = await getJSON(
      `https://restcountries.eu/rest/v2/name/${inpValue}`
    );
    return countries;
  };
  getCountryData();
  form.classList.add("formBack");
});

// rendering country
const renderCountry = function (data) {
  const html = `

  <section class="country">
    <h1>${data.name} <span>(${data.nativeName})</span></h1>
    <img width="500" src="${data.flag}">
    <div class="data__info">
      <h3>Native name: <span>${data.nativeName}</span></h3>
      <h3>Abbreviation: <span>${data.alpha3Code}</span></h3>
      <h3>Capital city: <span>${data.capital}</span></h3>
      <h3>Area: <span>${data.area ? data.area / 1000 : 0}</span> km²</h3>
      <h3>Region: <span>${data.region}</span></h3>
      <h3>Subregion: <span>${data.subregion}</span></h3>
      <h3>Languages: <span>${data.languages[0].name}, (${
    data.languages[0].nativeName
  })</span></h3>
  <h3>Population: <span>${(data.population / 1000000).toFixed(
    1
  )} Million people</span></h3>
  <h3>Neighbour countrys: <span>
  ${
    data.borders.length > 0 ? [...data.borders] : "No countries found!"
  }</span></h3>
  <h3>Currency: <span>${data.currencies[0].name} (${
    data.currencies[0].symbol
  })</span></h3>
  <h3>Calling code: <span>"${[...data.callingCodes]}"</span></h3>
  <h3>Top Level Domain: <span>"${data.topLevelDomain}"</span></h3>
  <h3>Timezones: <span>${data.timezones}</span></h3>
  <h3>Latitude and longitude: <span>(${data.latlng})</span></h3>
    </div>
  </section>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
};
