$(document).ready(function () {
    console.log('Page has been loaded');
    let cityName;
    document.getElementById("mySubmit").onclick = function () {
        cityName = document.getElementById("myText").value

        $.ajax({
            url: `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},CT,USA&units=imperial&appid=${API_KEY}`,
            method: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                const lat = data[0].lat;
                const lon = data[0].lon;
                $("#result-city").html(data[0].name);

                $.ajax({
                    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`,
                    method: 'get',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        console.log(data.list)

                        //current weather displayed in today-box
                        const iconCode0 = data.list[0].weather[0].icon
                        const iconImage0 = document.createElement("img");
                        iconImage0.src = `https://openweathermap.org/img/wn/${iconCode0}@2x.png`;
                        $("#result-icon").append(iconImage0);
                        $("#result-description").html(data.list[0].weather[0].description);
                        $("#result-temp").html(data.list[0].main.temp_max + "° F");

                        const infos = data.list

                        // getting dates/icon code from index 1-6 from array of objects from data to put into each forecast-box
                        const dates_arr = [];
                        const icon_arr = []
                        const n = 8;
                        for (let i = 1; i < n; i++) {
                            dates_arr.push(infos[i]["dt_txt"]);
                            icon_arr.push(infos[i]["weather"][0]["icon"])
                        }
                        console.log(dates_arr);
                        console.log(icon_arr);

                        // create new div element for each date, append it to #forecast element
                        $.each(dates_arr, function (index, value) {

                            $("#forecast").append('<div>' + value + '</div>');
                        });

                        //date, weather icon, low/high temp, weather description for each forecast-box
                        //forecast-box 1
                        $("#date1").html(data.list[1].dt_txt);
                        const iconCode = data.list[1].weather[0].icon
                        const iconImage = document.createElement("img");
                        iconImage.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                        $("#icon1").append(iconImage);
                        const tempHi = data.list[1].main.temp_max;
                        const tempLo = data.list[1].main.temp_min;
                        $("#temp1").html(`${tempLo}/${tempHi}`);
                        $("#description1").html(data.list[1].weather[0].description);

                        //forecast-box 2
                        $("#date2").html(data.list[2].dt_txt);
                        const iconCode1 = data.list[2].weather[0].icon;
                        const iconImage1 = document.createElement("img");
                        iconImage1.src = `https://openweathermap.org/img/wn/${iconCode1}@2x.png`;
                        $("#icon2").append(iconImage1);
                        const tempHi1 = data.list[2].main.temp_max;
                        const tempLo1 = data.list[2].main.temp_min;
                        $("#temp2").html(`${tempLo1}/${tempHi1}`);
                        $("#description2").html(data.list[2].weather[0].description);




                    },
                    error: function (err) {
                        console.log(err);
                    }
                })

            },
            error: function (err) {
                console.log(err);
            }
        })
    };

});

//create input for adding state code