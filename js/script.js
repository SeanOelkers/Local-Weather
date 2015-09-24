
$(document).ready(
function () {
    $.get("http://ipinfo.io/json")
    .done(updateLocation)
    .fail(handleErr)
});

function updateLocation(response) {
  $('#location').html(response['city']+", "+response['region']);
  var latlon = response['loc'].split(",");
  //$('#latlon').html("Lat: "+latlon[0]+" Long: "+latlon[1]);
  $.get("http://api.openweathermap.org/data/2.5/weather?lat="+latlon[0]+"&lon="+latlon[1]+"&units=imperial")
    .done(updateWeather)
    .fail(handleErr)
}

function updateWeather(response) {
    var farenheitTemp = Math.round(response['main']['temp']*10)/10;
    if(farenheitTemp < 32) {
        var bgImage = "https://farm1.staticflickr.com/3/2488408_10dfec417f_b.jpg";
    } else if (farenheitTemp < 60) {
        var bgImage = "https://farm4.staticflickr.com/3787/12302287493_af4531d298_k.jpg";
    } else if (farenheitTemp < 80) {
        bgImage = "https://farm1.staticflickr.com/3/2488408_10dfec417f_b.jpg";
    } else {
        bgImage = "https://farm4.staticflickr.com/3787/12302287493_af4531d298_k.jpg";
    }
    var celciusTemp = Math.round((response['main']['temp']-32)/1.8*10)/10;
    var windDirection = degToCompass(response['wind']['deg']);
    var windSpeed = Math.round(response['wind']['speed']*3600/5280*10)/10;
    var icon = "http://openweathermap.org/img/w/"+response['weather'][0]['icon']+".png";
    $('#celcius').html(celciusTemp+"&deg;C");
    $('#farenheit').html(farenheitTemp+"&deg;F");
    $('#wind').html(windSpeed+" mph "+windDirection);
    $('#desc').html(response['weather'][0]['main']);
    $('#iconID').html(icon);
    document.getElementById('weatherIcon').src=icon;
    var myElement = document.body;
    document.body.style.background = "url("+bgImage+") no-repeat center center fixed";
}

function handleErr(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

$( "#tempChange" ).click(function() {
  $( ".temp" ).toggle();
});