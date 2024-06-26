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
    console.log(dataParse)

    const cityName = dataParse.name;
    const iconCode = dataParse.weather[0].icon;
    const currentDescription = dataParse.weather[0].description;
    const currentTemp = dataParse.main.temp.toFixed(1) + "° F";

    const unixTime = dataParse.dt;
    const myDate = new Date(unixTime * 1000);
    const currentDate = myDate.toDateString().slice(0, 10);

    return (`
        <div class="today-container">
            <div class="today-result" id="result-city">${cityName}</div>
            <div class="today-result" id="result-date">${currentDate}</div>
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

    const time_sets = dataParse.list
    console.log('time_sets:', time_sets);

    const dates_1_arr = []
    const tempMax1 = []
    const tempMin1 = []
    const iconCode1 = []

    const dates_2_arr = []
    const tempMax2 = []
    const tempMin2 = []
    const iconCode2 = []

    const dates_3_arr = []
    const tempMax3 = []
    const tempMin3 = []
    const iconCode3 = []

    const dates_4_arr = []
    const tempMax4 = []
    const tempMin4 = []
    const iconCode4 = []

    //getting current date for const day_1
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

    //comparing the day variables to the dt_txt value of each array in order to create arrays containing the same date with their available times.

    for (let i = 0; i < 39; i++) {
        const weather_dates = infos[i]["dt_txt"].slice(0, 10);
        const date_timestamp = infos[i]["dt_txt"];
        const max_temp = infos[i]["main"]["temp_max"].toFixed(1);
        const min_temp = infos[i]["main"]["temp_min"].toFixed(1);
        const icon_code = infos[i]["weather"][0]["icon"];

        if (weather_dates === day_1) {
            dates_1_arr.push(date_timestamp);
            tempMax1.push(max_temp);
            tempMin1.push(min_temp);
            iconCode1.push(icon_code);
        } else {
            if (weather_dates === day_2) {
                dates_2_arr.push(date_timestamp);
                tempMax2.push(max_temp);
                tempMin2.push(min_temp);
                iconCode2.push(icon_code);
            } else {
                if (weather_dates === day_3) {
                    dates_3_arr.push(date_timestamp);
                    tempMax3.push(max_temp);
                    tempMin3.push(min_temp);
                    iconCode3.push(icon_code);
                } else {
                    if (weather_dates === day_4) {
                        dates_4_arr.push(date_timestamp);
                        tempMax4.push(max_temp);
                        tempMin4.push(min_temp);
                        iconCode4.push(icon_code);
                    }
                }
            }
        }
    }
    console.log(`dates_1_arr: ${dates_1_arr}`)
    console.log(`dates_2_arr: ${dates_2_arr}`)
    console.log(`dates_3_arr: ${dates_3_arr}`)
    console.log(`dates_4_arr: ${dates_4_arr}`)


    console.log(`tempMax1: ${tempMax1}`)
    console.log(`tempMax2: ${tempMax2}`)
    console.log(`tempMax3: ${tempMax3}`)
    console.log(`tempMax4: ${tempMax4}`)


    console.log(`iconCode1: ${iconCode1}`)
    console.log(`iconCode2: ${iconCode2}`)
    console.log(`iconCode3: ${iconCode3}`)
    console.log(`iconCode4: ${iconCode4}`)



    function createWeatherDates(dayArray, tempMax, tempMin, iconCode, dayLabel) {
        // Check if dayArray is empty
        if (dayArray.length === 0) {
            return { [dayLabel]: { date: null, "12am": {}, "3am": {}, "6am": {}, "9am": {}, "12pm": {}, "3pm": {}, "6pm": {}, "9pm": {} } };
        }

        // Extract the date part
        const date = dayArray[0].split(' ')[0];
        // Create the day object
        const dayObject = { date };

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

        // Fill each day's array with: min and max temp, icon code, time
        dayArray.forEach((timeString, index) => {
            // separate date and time
            const time = timeString.split(' ')[1];
            // if the "3 hour time range" value exists in the time slot key, set the weather info
            if (timeSlots[time]) {
                dayObject[timeSlots[time]] = { maxTemp: tempMax[index], minTemp: tempMin[index], iconCode: iconCode[index] };
            }
        });

        return { [dayLabel]: dayObject };
    }

    // Create weather_dates object
    const weather_dates = {
        ...createWeatherDates(dates_1_arr, tempMax1, tempMin1, iconCode1, 'day1'),
        ...createWeatherDates(dates_2_arr, tempMax2, tempMin2, iconCode2, 'day2'),
        ...createWeatherDates(dates_3_arr, tempMax3, tempMin3, iconCode3, 'day3'),
        ...createWeatherDates(dates_4_arr, tempMax4, tempMin4, iconCode4, 'day4')

    };
    console.log(weather_dates);


    const html = `
        <div class="box1">
            <p id="day1"></p>
            <p>${weather_dates["day2"]["date"]}</p>
            <img src= "https://openweathermap.org/img/wn/${weather_dates["day2"]["12pm"]["iconCode"]}@2x.png"/>
            <p>${weather_dates["day2"]["12pm"]["maxTemp"] + "/" + weather_dates["day2"]["12pm"]["minTemp"] + " °F"}</p>
        </div>
        <div class="box2">
            <p id="day2"></p>
            <p>${weather_dates["day3"]["date"]}</p>
            <img src= "https://openweathermap.org/img/wn/${weather_dates["day3"]["12pm"]["iconCode"]}@2x.png"/>
            <p>${weather_dates["day3"]["12pm"]["maxTemp"] + "/" + weather_dates["day3"]["12pm"]["minTemp"] + " °F"}</p>
        </div>
        <div class="box3">
            <p id="day3"></p>
            <p>${weather_dates["day4"]["date"]}</p>
            <img src= "https://openweathermap.org/img/wn/${weather_dates["day4"]["12pm"]["iconCode"]}@2x.png"/>
            <p>${weather_dates["day4"]["12pm"]["maxTemp"] + "/" + weather_dates["day4"]["12pm"]["minTemp"] + " °F"}</p>
        </div>
    `

    $("#forecast").append(html)

    let dayDate = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    $('#day1').html(weekday[(dayDate.getDay() + 1) % 7]);
    $('#day2').html(weekday[(dayDate.getDay() + 2) % 7]);
    $('#day3').html(weekday[(dayDate.getDay() + 3) % 7]);
}

/* ---------- TEMPLATES ---------- */

const landingPage = (`
<div class="sunshine-container">
    <div><img src="weather.png" alt="clouds and sunshine" id="weather-image"></div>
</div>
`)

const searchWeatherPage = (`
    <div class="search-container">
        <form class="search-box" id="validate-form">
            <label for="userCity">City:</label>
            <input class="city" id="myText" type="text" required />
            <label for="userState">State Code: </label> 
            <input class="state" id="myStatet" type="text" required/>
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

const getTodayData = (query) => {
    const options = {
        type: 'GET',
        "url": `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_KEY}`,
        success: data => {
            console.log(data);
            renderCurrentWeather(JSON.stringify(data))
        },
        error: function (err) {
            console.log(err);
            const errorMessage = '<div class = "error">Error! check your state and/or city spelling</div> <img src="sadCloud.png" alt="crying-cloud" id="weather-image">'
            $("#validate-form").append(errorMessage)
        }
    }
    $.ajax(options)
}

const getGeoData = (query, query2) => {
    console.log('user city:', query)


    const options = {
        type: 'GET',
        "url": `https://api.openweathermap.org/geo/1.0/direct?q=${query},${query2},USA,&units=imperial&appid=${API_KEY}`,
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
    const cityState = $(event.currentTarget).find('.state').val();
    console.log('cityName: ', cityName);
    getGeoData(cityName, cityState);
    getTodayData(cityName)
    setState({ route: 'todayPage' });
}

/* ---------- EVENT LISTENERS ---------- */

$('body').on('submit', '.search-box', event => inputHandler(event));

/* ---------- LOAD PAGE ---------- */
$(render)
