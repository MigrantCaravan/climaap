import "./App.css";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  function getWeather(event) {
    if (event.key === "Enter") {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=dca2eb232d0ff076bb6a2867edd3a33a`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
          console.log(weatherData);
        });
    }
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  return (
    <Wrapper>
      <Input
        placeholder="Enter your city"
        onChange={handleChange}
        value={city}
        onKeyPress={getWeather}
      ></Input>
      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>
            Welcome to the Clima App, Enter the name of a city to display the
            current weather
          </p>
        </div>
      ) : (
        <Data>
          <Fecha>{date}</Fecha>
          <City>{weatherData.name}</City>
          <Temp>{Math.round(weatherData.main.temp)} °C</Temp>
          <EmojiContainer>
            <Tiempo>{weatherData.weather[0].main}</Tiempo>
            <Img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="img"
            ></Img>
          </EmojiContainer>
        </Data>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 25px; */
  background-color: #9d84b7;
  background-image: url("https://www.transparenttextures.com/patterns/connected.png");
  /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
  height: 100vh;
  width: 100vw;
`;

const Input = styled.input`
  padding: 15px;
  width: 80%;
  margin: auto;
  border: 2px solid #d5d5d5;
  border-radius: 8px;
  font-size: 17px;
`;

const Data = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Fecha = styled.p`
  font-size: 18px;
  font-weight: 200;
`;

const City = styled.p`
  font-size: 40px;
  font-weight: 300;
`;

const Temp = styled.p`
  font-size: 90px;
  padding: 5px;
  border: 1px solid #d5d5d5;
  border-radius: 12px;
  background-color: #091353;
  color: white;
`;

const Tiempo = styled.p`
  font-size: 30px;
  font-weight: 200;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

const EmojiContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Emoji = styled.div``;

export default App;
