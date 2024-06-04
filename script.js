const API_KEY = 'e6d7ae5f1ecb4b18940c284e8e5da8f9'

const STATE = {
    route: 'landingPage'
}
/* ---------- CHECK/UPDATE STATE ---------- */
const setState = (newItem, currentState = STATE) => {
    const newState = Object.assign({}, currentState, newItem);
    Object.assign(currentState, newState)

    render();

}
/* ---------- TEMPLATE HELPERS ---------- */

const createTodayData = response => {
    const dataParse = JSON.parse(response);
    console.log(dataParse.city.name);
    const cityName = dataParse.city.name;
    const iconCode = dataParse.list[0].weather[0].icon;
    const currentDescription = dataParse.list[0].weather[0].description;
    const currentTemp = dataParse.list[0].main.temp.toFixed(1) + "° F";
    const currentDate = dataParse.list[0].dt_txt.slice(0, 10)
    const resultDate = new Date().toDateString(currentDate)

    console.log(`current date: ${currentDate}`)
    console.log(`result date: ${resultDate}`)

    return (`
        <div class="today-container">
            <div class="today-result" id="result-city">${cityName}</div>
            <div class="today-result" id="result-date"></div>
            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png"/>
            <br>
            <br>
            <div class="today-result" id="result-description">${currentDescription}</div>
            <div class="today-result" id="result-temp">${currentTemp}</div>
        </div>
    `)
}

const createForecastData = response => {
    const dataParse = JSON.parse(response);
    const infos = dataParse.list

    const dates_1_arr = []
    const tempMax1 = []
    const dates_2_arr = []
    const tempMax2 = []
    const dates_3_arr = []
    const tempMax3 = []
    const dates_4_arr = []
    const tempMax4 = []
    const dates_5_arr = []
    const tempMax5 = []

    // const day_1 = new Date(new Date().toISOString())
    // console.log(day_1)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const day_1 = `${year}-${month}-${day}`;
    console.log(`day_1: ${day_1}`);

    const day_2 = new Date(new Date().setHours(24, 0, 0, 0)).toISOString().slice(0, 10)
    console.log(`day_2: ${day_2}`)
    const day_3 = new Date(new Date().setHours(48, 0, 0, 0)).toISOString().slice(0, 10)
    console.log(`day_3: ${day_3}`)
    const day_4 = new Date(new Date().setHours(72, 0, 0, 0)).toISOString().slice(0, 10)
    console.log(`day_4: ${day_4}`)
    const day_5 = new Date(new Date().setHours(96, 0, 0, 0)).toISOString().slice(0, 10)
    console.log(`day_5: ${day_5}`)

    const no = 39;
    for (let i = 0; i < no; i++) {
        if (infos[i]["dt_txt"].slice(0, 10) === day_1) {
            dates_1_arr.push(infos[i]["dt_txt"]);
            tempMax1.push(infos[i]["main"]["temp_max"].toFixed(1));
        } else {
            if (infos[i]["dt_txt"].slice(0, 10) === day_2) {
                dates_2_arr.push(infos[i]["dt_txt"]);
                tempMax2.push(infos[i]["main"]["temp_max"].toFixed(1));
            } else {
                if (infos[i]["dt_txt"].slice(0, 10) === day_3) {
                    dates_3_arr.push(infos[i]["dt_txt"]);
                    tempMax3.push(infos[i]["main"]["temp_max"].toFixed(1));
                } else {
                    if (infos[i]["dt_txt"].slice(0, 10) === day_4) {
                        dates_4_arr.push(infos[i]["dt_txt"]);
                        tempMax4.push(infos[i]["main"]["temp_max"].toFixed(1));
                    } else {
                        if (infos[i]["dt_txt"].slice(0, 10) === day_5) {
                            dates_5_arr.push(infos[i]["dt_txt"]);
                            tempMax5.push(infos[i]["main"]["temp_max"].toFixed(1));
                        }

                    }
                }
            }
        }
    }
    console.log(`dates_1_arr: ${dates_1_arr}`)
    console.log(`dates_2_arr: ${dates_2_arr}`)
    console.log(dates_2_arr)
    console.log(`dates_3_arr: ${dates_3_arr}`)
    console.log(`dates_4_arr: ${dates_4_arr}`)
    console.log(`dates_5_arr: ${dates_5_arr}`)
    console.log(`tempMax1: ${tempMax1}`)
    console.log(`tempMax2: ${tempMax2}`)
    console.log(tempMax2)
    console.log(`tempMax3: ${tempMax3}`)
    console.log(`tempMax4: ${tempMax4}`)
    console.log(`tempMax5: ${tempMax5}`)


    function createWeatherDates(dayArray, dayLabel) {
        // Extract the date part
        const date = dayArray[0].split(' ')[0];

        // Define the time slots mapping
        const timeSlots = {
            "00:00:00": "12am",
            "03:00:00": "3am",
            "06:00:00": "6am",
            "09:00:00": "9am",
            "12:00:00": "12pm",
            "15:00:00": "3pm",
            "18:00:00": "6pm",
            "21:00:00": "9pm"
        };

        // Create the day object
        const dayObject = { date };

        // Fill the time slots with empty objects
        dayArray.forEach(timeString => {
            const time = timeString.split(' ')[1];
            dayObject[timeSlots[time]] = {};
        });

        return { [dayLabel]: dayObject };
    }

    // Create weather_dates object
    const weather_dates = {
        ...createWeatherDates(dates_2_arr, 'day2'),
        ...createWeatherDates(dates_3_arr, 'day3')
    };

    console.log(weather_dates);


    const dates_arr = []
    const tempMaxArr = []
    const tempMinArr = []
    const iconCode = []

    const n = 8;
    for (let i = 1; i < n; i++) {
        dates_arr.push(infos[i]["dt_txt"].slice(0, 10));
        tempMaxArr.push(infos[i]["main"]["temp_max"].toFixed(1));
        tempMinArr.push(infos[i]["main"]["temp_min"].toFixed(1));
        iconCode.push(infos[i]["weather"][0]["icon"]);
    }
    console.log(dates_arr)
    console.log(tempMaxArr)
    console.log(tempMinArr)
    console.log(iconCode)

    let html = "";
    for (let i = 0; i < 7; ++i) {

        html += `
            <div class="box${i}">
                <p>${dates_arr[i]}</p>
                <img src= "https://openweathermap.org/img/wn/${iconCode[i]}@2x.png"/>
                <p>${tempMaxArr[i]}/${tempMinArr[i]}°F</p>
            </div>
        `
    }
    $("#forecast").append(html)
}

/* ---------- TEMPLATES ---------- */

const landingPage = (`
<div class="sunshine-container">
    <div><img src="weather.png" alt="clouds and sunshine" id="weather-image"></div>
</div>
`)

const searchWeatherPage = (`
    <div class="search-container">
        <form class="search-box">
            <input class="city" id="myText" type="text" />
            <button type="submit" id="mySubmit">Enter</button>
        </form>
    </div>
`)

/* ---------- RENDER FUNCTION ---------- */


const renderWeatherPage = () => {
    $('#input').html(searchWeatherPage);
};

const renderCurrentWeather = response => {
    const currentWeather = createTodayData(response)
    $('#today').html(currentWeather)
};

const renderSevenDay = response => {
    $('#forecast').html('');
    createForecastData(response);
};

const renderLandingPage = () => {
    $('#sunshine').html(landingPage);
}

const render = () => {
    renderWeatherPage();
    if (STATE.route === 'todayPage') {
        $("#sunshine").remove();
    } else {
        renderLandingPage()
    }
};
/* ---------- AJAX REQUEST ---------- */


const getGeoData = (query) => {
    console.log('user city:', query)

    const options = {
        type: 'GET',
        "url": `https://api.openweathermap.org/geo/1.0/direct?q=${query},CT,USA&units=imperial&appid=${API_KEY}`,
        success: data => {
            console.log(data);
            const resp = {
                lat: data[0].lat,
                lon: data[0].lon
            }
            getWeather(JSON.stringify(resp))
            return data;
        },
        error: function (err) {
            console.log(err);
        }
    }
    $.ajax(options)
}

const getWeather = (data) => {
    console.log(`Second call: ${data}`)
    console.log(data)
    const dataParse = JSON.parse(data)
    console.log(dataParse)

    const valueLat = dataParse.lat
    console.log('valueLat: ', valueLat)
    const valueLon = dataParse.lon;
    console.log('valueLon: ', valueLon);

    const options = {
        type: 'GET',
        "url": `https://api.openweathermap.org/data/2.5/forecast?lat=${valueLat}&lon=${valueLon}&units=imperial&appid=${API_KEY}`,
        success: data => {
            console.log('weather data: ', data);
            renderCurrentWeather(JSON.stringify(data))
            renderSevenDay(JSON.stringify(data));
        },
        error: function (err) {
            console.log(err);
        }
    }
    $.ajax(options);
}

/* ---------- EVENT HANDLERS---------- */

const inputHandler = event => {
    event.preventDefault();
    const cityName = $(event.currentTarget).find('.city').val();
    console.log('cityName: ', cityName);
    getGeoData(cityName);
    setState({ route: 'todayPage' });
}

/* ---------- EVENT LISTENERS ---------- */

$('body').on('submit', '.search-box', event => inputHandler(event));

/* ---------- LOAD PAGE ---------- */
$(render)
