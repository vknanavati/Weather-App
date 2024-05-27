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



/* ---------- TEMPLATES ---------- */

const searchWeatherPage = (`
    <div class="search-container">
        <form class="search-box">
            <input class="city" id="myText" type="text" />
            <button type="submit" id="mySubmit">Enter</button>
        </form>
    </div>
`)

// const displaySevenDay = (`

//     <div class="forecast-box" id="box1"></div>
//     <div class="forecast-box" id="box2"></div>
//     <div class="forecast-box" id="box3"></div>
//     <div class="forecast-box" id="box4"></div>
//     <div class="forecast-box" id="box5"></div>
//     <div class="forecast-box" id="box6"></div>
//     <div class="forecast-box" id="box7"></div>

// `)


/* ---------- RENDER FUNCTION ---------- */


const renderWeatherPage = () => {
    $('#input').html(searchWeatherPage);
};

const renderCurrentWeather = response => {
    // console.log(response)
    const dataParse = JSON.parse(response);
    console.log(dataParse.city.name);
    $('#result-city').html(dataParse.city.name);
    const iconCode = dataParse.list[0].weather[0].icon;
    const iconImage = document.createElement("img");
    iconImage.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    $("#result-icon").append(iconImage);
    $("#result-description").html(dataParse.list[0].weather[0].description);
    $("#result-temp").html(dataParse.list[0].main.temp_max + "° F");
};

const renderSevenDay = response => {
    const dataParse = JSON.parse(response);
    // $('#forecast').html(displaySevenDay);
    const infos = dataParse.list
    // const iconCode = data.list[1].weather[0].icon
    // const iconImage = document.createElement("img");
    // iconImage.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    // $("#icon1").append(iconImage);

    const dates_arr = []
    const tempMaxArr = []
    const tempMinArr = []
    const iconCode = []
    const n = 8;
    for (let i = 1; i < n; i++) {
        dates_arr.push(infos[i]["dt_txt"]);
        tempMaxArr.push(infos[i]["main"]["temp_max"])
        tempMinArr.push(infos[i]["main"]["temp_min"])
        iconCode.push(infos[i]["weather"][0]["icon"])
    }
    console.log(dates_arr)
    console.log(tempMaxArr)
    console.log(tempMinArr)
    console.log(iconCode)

    let html = "";
    // let maxTemp = "";
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

const render = () => {
    renderWeatherPage();
}
/* ---------- AJAX REQUEST ---------- */


const getGeoData = (query) => {
    console.log('user city:', query)

    const options = {
        type: 'GET',
        "url": `http://api.openweathermap.org/geo/1.0/direct?q=${query},CT,USA&units=imperial&appid=${API_KEY}`,
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


}

/* ---------- EVENT LISTENERS ---------- */

$('body').on('submit', '.search-box', event => inputHandler(event));

/* ---------- LOAD PAGE ---------- */
$(render)
