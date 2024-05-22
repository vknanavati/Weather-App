// const myKey = config.MY_KEY

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
        "url": `http://api.openweathermap.org/geo/1.0/direct?q=${query},CT,USA&units=imperial&appid=e6d7ae5f1ecb4b18940c284e8e5da8f9`,
        success: data => {
            console.log(data);
            // const lat = data[0].lat;
            // const lon = data[0].lon;
            // console.log(lat);
            // console.log(lon);
            getLon(data);
            getLat(data);
        },
        error: function (err) {
            console.log(err);
        }
    }
    $.ajax(options);
}

function getLon(data) {
    const lon = data[0].lon;
    console.log(lon);
    return lon;

}

function getLat(data) {
    const lat = data[0].lat;
    console.log(lat);
    return lat;



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