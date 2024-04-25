// sample data
const weatherData = {
	London: {
		forecast: "Cloudy",
		temperature: "15°C",
		humidity: "77%",
		windSpeed: "14km/h",
		chanceOfRain: "10%",
	},
	Berlin: {
		forecast: "Sunny",
		temperature: "19°C",
		humidity: "55%",
		windSpeed: "10km/h",
		chanceOfRain: "0%",
	},
	Tokyo: {
		forecast: "Sunny",
		temperature: "29°C",
		humidity: "95%",
		windSpeed: "11km/h",
		chanceOfRain: "0%",
	},
};

// parse query params
function getQueryParams() {
	const params = {};
	const queryStr = window.location.search.substring(1);
	const paramPairs = queryStr.split("&");

	for (const pair of paramPairs) {
		const [key, value] = pair.split("=");
		params[key] = decodeURIComponent(value);
	}

	return params;
}

function getWeatherData(city) {
	// normalize the city name to match the keys in the weatherData object
	const cityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
	// return the weather data for the city, or null if not found
	return weatherData[cityName] || null;
}

function updateWeatherData(city) {
	const weatherInfo = getWeatherData(city);

	if (weatherInfo) {
		document.getElementById("info-temperature").textContent =
			weatherInfo.temperature;
		document.getElementById("info-location").textContent = city;
		document.getElementById("info-humidity").textContent =
			weatherInfo.humidity;
		document.getElementById("info-wind").textContent =
			weatherInfo.windSpeed;
		document.getElementById("info-rain").textContent =
			weatherInfo.chanceOfRain;
		document.getElementById("info-forecast").textContent =
			weatherInfo.forecast;
	} else {
		alert("Weather data for this city is not available.");
	}
}

// search button event
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector(".btn-search");
    const searchInput = document.querySelector(".search-input");
    const backLink = document.getElementById("back-link");
    const queryParams = getQueryParams();
    let previousSearch = queryParams.search || "";
    let initialURL = document.location.href.split('?')[0];

    if (previousSearch) {
        searchInput.value = previousSearch;
        updateWeatherData(previousSearch);
    }

    if (queryParams.returnUrl) {
        backLink.href = queryParams.returnUrl;
        backLink.style.display = "block";
    } else {
        backLink.style.display = "none";
    }

    searchButton.addEventListener("click", function () {
        const inputVal = searchInput.value.trim();

        if (inputVal) {
            updateWeatherData(inputVal);

            if (inputVal !== previousSearch) {
                backLink.style.display = "block";
                backLink.href = `${initialURL}?search=${encodeURIComponent(previousSearch)}`;
                previousSearch = inputVal;
            } else {
                backLink.style.display = "none";
            }
        } else {
            alert("Please enter a city name.");
        }
    });
});

function getQueryParams() {
    const params = {};
    const queryStr = window.location.search.substring(1);
    const paramPairs = queryStr.split("&");

    for (const pair of paramPairs) {
        const [key, value] = pair.split("=");
        if (value !== undefined) {
            params[key] = decodeURIComponent(value.replace(/\+/g, " "));
        } else {
            params[key] = "";
        }
    }
    return params;
}
