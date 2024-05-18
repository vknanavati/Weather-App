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



/* ---------- RENDER FUNCTION ---------- */



/* ---------- AJAX REQUEST ---------- */
let cityName;
document.getElementById("mySubmit").onclick = function () {
    cityName = document.getElementById("myText").value

    const options = {
        type: 'GET',
        "url": `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},CT,USA&units=imperial&appid=e6d7ae5f1ecb4b18940c284e8e5da8f9`,
        success: data => {
            console.log(data);
            const lat = data[0].lat;
            const lon = data[0].lon;
            $("#result-city").html(data[0].name);
        },
        error: err => {
            console.log(err)
        }
    }
}

$.ajax(options);





/* ---------- EVENT HANDLERS---------- */



/* ---------- EVENT LISTENERS ---------- */



/* ---------- LOAD PAGE ---------- */
$(render)