import React from "react";
import "./Content.css";
import Arrow from "./img/arrow.svg";

export default function Content(props) {
  const WIND_DIRECTION = props.currentWeather.wind.deg;

  const convertTimestamp = (timestamp) => {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      // yyyy = d.getFullYear(),
      // mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
      // dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
      ampm = "AM",
      time;

    if (hh > 12) {
      h = hh - 12;
      ampm = "PM";
    } else if (hh === 12) {
      h = 12;
      ampm = "PM";
    } else if (hh === 0) {
      h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    // time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm;
    time = h + ":" + min + " " + ampm;
    return time;
  };

  const sunrise = convertTimestamp(props.currentWeather.sys.sunrise);
  const sunset = convertTimestamp(props.currentWeather.sys.sunset);

  if (props.currentWeather !== undefined) {
    return (
      <section>
        <h2 className="city">
          {props.currentWeather.name}, {props.currentWeather.sys.country}
        </h2>
        <p className="time">
          Сейчас {convertTimestamp(props.currentWeather.dt)}
        </p>
        <div className="weather-main">
          <p className="temp-current">
            {Math.floor(props.currentWeather.main.temp - 273.15)}°
          </p>
          <div className="weather-additional">
            <p className="description">
              {props.currentWeather.weather[0].description}
            </p>
            <p className="temp-feels-like">
              ощущается как{" "}
              {Math.floor(props.currentWeather.main.feels_like - 273.15)}
              °C
            </p>
          </div>
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/wn/${props.currentWeather.weather[0].icon}@2x.png`}
            alt="icon"
          />
        </div>
        <div className="wind">
          <p className="wind-speed">Скорость ветра: {props.currentWeather.wind.speed} м/с.</p>
          <img
            className="wind-arrow"
            src={Arrow}
            alt="arrow"
            height="25"
            width="25"
            style={{ transform: `rotate(${WIND_DIRECTION}deg)` }}
          />
        </div>
        <div className="day-length">
          <p>Восход: {sunrise}</p>
          <p>Закат: {sunset}</p>
        </div>
      </section>
    );
  }
}
