import React, { useState } from "react";
import Content from "./Content";
import Card from "./Card";
import "./App.css";

// const api = {
//   key: "6d16fc04075b88bde065d1f662747016",
//   base: "https://api.openweathermap.org/data/2.5/",
// };

export default function App() {
  const [city, setCity] = useState("");
  // const [country, setCountry] = useState("Russia");
  const [currentWeather, setCurrentWeather] = useState([]);

  async function submitHandler(event) {
    event.preventDefault();
    let response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d16fc04075b88bde065d1f662747016&lang=ru`
    );
    let data = await response.json();
    setCurrentWeather(data);
    setCity("")
  }

  return (
    <div>
      <form className="search" onSubmit={submitHandler}>
        <input
          className="search-bar"
          id="city"
          type="text"
          placeholder="Город"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <button className="search-button" type="submit">Submit</button>
      </form>
      <Card>
        {currentWeather.sys !== undefined ? (
          <Content currentWeather={currentWeather} />
        ) : (
          <div className="welcome-blank">Пожалуйста, введите название города в поиск</div>
        )}
      </Card>
    </div>
  );
}
