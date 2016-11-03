$( document ).ready(function(){

  // var thermostat = new Thermostat();

$("#calendar").change(function (event) {
var city = $("#weather").val();
  $.getJSON("bookster-20161102-02:3WR7yVf2kZjYvGRVW3uSpnSfTHVSpkrad9dthIYyILkeA2rImqsjNPwaPzx9kGtS" "https://secure.booksterhq.com/system/api/v1/booking/setup/118022/ir.json?name=rates&latest=1", function (result) {
  $(".weather_forcast").text("Current temperature in " + city + ": " + result.main.temp + " °C");
  event.preventDefault();
  });
  });

  });
