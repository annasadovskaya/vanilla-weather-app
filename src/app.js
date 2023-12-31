function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  while (forecastElement.firstChild) {
    forecastElement.removeChild(forecastElement.firstChild);
  }

  // let forecastHTML = `<div class="row">`;

  // forecast.forEach(function (forecastDay, index) {
  //   if (index < 6) {
  //     forecastHTML =
  //       forecastHTML +
  //       `
  //  <div class="col-2 next-weather-info">
  //                 <div class="weather-forecast-date">${formatDay(
  //                   forecastDay.dt
  //                 )}</div>
  //                 <img
  //                   src="https://openweathermap.org/img/wn/${
  //                     forecastDay.weather[0].icon
  //                   }@2x.png"
  //                   alt=""
  //                   width="60px"
  //                 />
  //                 <div class="weather-forecast-temperatures">
  //                   <span class="weather-forecast-max">${Math.round(
  //                     forecastDay.temp.max
  //                   )}°</span>
  //                   <span class="weather-forecast-min">${Math.round(
  //                     forecastDay.temp.min
  //                   )}°</span>
  //                 </div>
  //               </div>
  // `;
  //   }
  // });

  // forecastHTML = forecastHTML + `</div>`;
  // forecastElement.innerHTML = forecastHTML;

  //Adding the forecast
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      const cardCol = document.createElement("div");
      cardCol.className = "col-2 next-weather-info";

      //Creating a div for Date
      const forecastDateDiv = document.createElement("div");
      forecastDateDiv.textContent = `${formatDay(forecastDay.dt)}`;

      //Creating an img element
      const forecastImg = document.createElement("img");
      forecastImg.src = `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`;
      forecastImg.alt = "Forecast Image";
      forecastImg.style.width = "60px";

      //Creating a forecast temperature
      const forecastTemperature = document.createElement("div");
      //Creating a forecast-max span
      const spanForecastMax = document.createElement("span");
      spanForecastMax.textContent = `${Math.round(forecastDay.temp.max)}°`;

      //Creating a forecast-min span
      const spanForecastMin = document.createElement("span");
      spanForecastMin.className = "weather-forecast-min";
      spanForecastMin.textContent = `${Math.round(forecastDay.temp.min)}°`;

      //Appending spans
      forecastTemperature.appendChild(spanForecastMax);
      forecastTemperature.appendChild(spanForecastMin);

      cardCol.appendChild(forecastDateDiv);
      cardCol.appendChild(forecastImg);
      cardCol.appendChild(forecastTemperature);

      //Append coardCol div
      forecastElement.appendChild(cardCol);
    }
  });
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad"; //Open weather API provided by SheCodes
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector(
    "#current-temperature-degrees"
  );
  let weatherConditionElement = document.querySelector("#weather-condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  weatherConditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "befec49c889f95a0ee6e5054ad3ab1e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

search("San Diego");
