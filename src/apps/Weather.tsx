import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  viewWeather: boolean;
  getWeatherInfo: Function;
}

const api = {
  key: "8743111fa6f5791c62e48884c89d323a",
  base: "https://api.openweathermap.org/data/2.5/",
}

const WeatherWrap = styled.div<{$weatherIco: string}>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1.2rem 2rem;
  color: #fff;
  text-align: right;
  z-index: 9;

  .metric-state {
    display: flex;
    height: 3.8rem;
    white-space: nowrap;

    .ico-weather {
      display: inline-block;
      width: 3.8rem;
      height: 3.8rem;
      margin-right: 0.6rem;
      text-align: left;
      text-indent: -999rem;
      background-image: url(${(props) => props.$weatherIco});
      background-position: 50% 0;
      background-repeat: no-repeat;
      background-size: 5rem auto;
      overflow: hidden;
    }

    .metric-stat-num {
      margin: 0;
      padding: 0;
      font-size: 2.8rem;
      text-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, .3);
    } 
    .degree {
      margin: 0.4rem 0 0 0.4rem;
      font-size: 1.6rem;
      vertical-align: top;
      text-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, .3);
    }
  }

  .location {
    display: inline-block;
    margin: 0;
    padding: 0 0 0.4rem;
    font-size: 1.3rem;
    vertical-align: top;
    word-break: break-all;
    text-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, .3);
  }
`;

const Weather = ({viewWeather, getWeatherInfo}: Props) => {
  const [getWeaInfo, setGetWeaInfo] = useState(false);
  const [getTemp, setTemp] = useState('');
  const [getWeaIcon, setWeaIcon] = useState('');
  const [getWeaDesc, setWeaDesc] = useState('');
  const [getLocal, setLocal] = useState('');
  let iconUrl ='';

  const getWeather = (lat: number, lon: number) => {
    fetch(`${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const weaDescript = json.weather[0].description;
      const weaIcoCode = json.weather[0].icon;
      const location = json.name;
      
      const weatherInfo = {
        location: json.name, 
        weather: json.weather[0].main,
        weatherDesc: json.weather[0].description,
        temperature: json.main.temp,
        tempFeelLike: json.main.feels_like,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        sunrise: new Date(json.sys.sunrise * 1000).toTimeString().split(' ')[0],
        sunset: new Date(json.sys.sunset * 1000).toTimeString().split(' ')[0],
      };
   
      setTemp(temperature);
      setWeaDesc(weaDescript);
      setWeaIcon(weaIcoCode);
      setLocal(location);
      getWeatherInfo(weatherInfo);
    });
  } 
  
  getWeaIcon !== '' ? iconUrl = 'http://openweathermap.org/img/w/' + getWeaIcon + '.png' : iconUrl = '';

  useEffect(() => {
    const handleGeoSucces = (position: any) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      setGetWeaInfo(true);
      getWeather(lat, lon);
    }
    const handleGeoError = () => {
      setGetWeaInfo(false);
      // console.log('Cant access geo location');
    }
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
  });

  return (
    <WeatherWrap className="weather-wrap" $weatherIco={iconUrl}>
      {viewWeather ? 
        <>
          {getWeaInfo ? 
            <>
              <div className="metric-state">
                <i className="ico-weather">{getWeaDesc}</i>
                <span className="metric-stat-num">{getTemp}</span>
                <span className="degree">℃</span>
              </div>
              <div className="location">{getLocal}</div>
            </>
            : <span className="error">Can't access geo location</span>
          }
        </>
        : null
        }
    </WeatherWrap>
  );
}

export default Weather;