
$(document).ready(
function () {
    $.get("http://ipinfo.io/json")
    .done(updateLocation)
    .fail(handleErr)
});

function updateLocation(response) {
  $('#location').html(response['city']+", "+response['region']);
  var latlon = response['loc'].split(",");
  $.get("http://api.openweathermap.org/data/2.5/weather?lat="+latlon[0]+"&lon="+latlon[1]+"&units=imperial")
    .done(updateWeather)
    .fail(handleErr)
}

function updateWeather(response) {
    var farenheitTemp = Math.round(response['main']['temp']*10)/10;
    var celciusTemp = Math.round((response['main']['temp']-32)/1.8*10)/10;
    var windDirection = degToCompass(response['wind']['deg']);
    var windSpeedMPH = Math.round(response['wind']['speed']*0.68182*10)/10;
    var windSpeedKPH = Math.round(response['wind']['speed']*1.09728*10)/10;
    var icon = "http://openweathermap.org/img/w/"+response['weather'][0]['icon']+".png";
    var mainWeather = response['weather'][0]['main'];
    if(mainWeather) {
        document.getElementById('default').id = mainWeather;
    }
    var supplWeather = response['weather'][0]['description'];
    $('#celcius').html(celciusTemp+"&deg; C");
    $('#farenheit').html(farenheitTemp+"&deg; F");
    $('#windMPH').html(windDirection+" @ "+windSpeedMPH+" MPH ");
    $('#windKPH').html(windDirection+" @ "+windSpeedKPH+" KPH ");
    $('#desc').html(mainWeather+"<br /><small>["+supplWeather+"]</small>");
    $('#iconID').html(icon);
    document.getElementById('weatherIcon').src=icon;
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
    //toggle temperature units
  $( ".temp" ).toggle();
});

$( "#windChange" ).click(function() {
    //toggle wind speed units
  $( ".wind" ).toggle();
});
