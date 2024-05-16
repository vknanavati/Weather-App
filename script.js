$(document).ready(function () {
    console.log('Page has been loaded');
    let cityName;
    document.getElementById("mySubmit").onclick = function () {
        cityName = document.getElementById("myText").value


        $.ajax({
            url: `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},CT,USA&units=imperial&appid=${process.env.API_KEY}`,
            method: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                const lat = data[0].lat;
                const lon = data[0].lon;
                $("#result-city").html(data[0].name);


                $.ajax({
                    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`,
                    method: 'get',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        console.log(data.list)


                        const infos = data.list
                        for (const index in infos) {
                            console.log(infos[index]["dt_txt"])
                        };


                        const iconCode0 = data.list[0].weather[0].icon
                        const iconImage0 = document.createElement("img");
                        iconImage0.src = `https://openweathermap.org/img/wn/${iconCode0}@2x.png`;
                        $("#result-icon").append(iconImage0);
                        $("#result-description").html(data.list[0].weather[0].description);
                        $("#result-temp").html(data.list[0].main.temp_max + "° F");




                        $("#date1").html(data.list[1].dt_txt);
                        const iconCode = data.list[1].weather[0].icon
                        const iconImage = document.createElement("img");
                        iconImage.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                        $("#icon1").append(iconImage);
                        const tempHi = data.list[1].main.temp_max;
                        const tempLo = data.list[1].main.temp_min;
                        $("#temp1").html(`${tempLo}/${tempHi}`);
                        $("#description1").html(data.list[1].weather[0].description);

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