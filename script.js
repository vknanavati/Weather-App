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


/* ---------- RENDER FUNCTION ---------- */


const renderWeatherPage = () => {
    $('#input').html(searchWeatherPage);
};

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
