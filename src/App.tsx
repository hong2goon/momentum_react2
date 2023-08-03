import { useState } from 'react';
import Settings from './apps/Settings';
import Greeting from './apps/Greeting';
import Weather from './apps/Weather';
import Todo from './apps/Todo';
import bgImg1 from './asset/images/background/1.jpg';
import bgImg2 from './asset/images/background/2.jpg';
import bgImg3 from './asset/images/background/3.jpg';
import styled from 'styled-components';
import './asset/style/styles.scss';

const bgArr:Array<string> = [bgImg1, bgImg2, bgImg3];
const randomIdx: number = Math.floor(Math.random() * bgArr.length);

const Background = styled.div<{$url: string}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url(${props => props.$url}) 50% 50% no-repeat;
  background-size: cover;
  z-index: 1;
`;
 
function App() {
  const [chkedBg, setChkedBg] = useState(bgArr[randomIdx]);
  const chkHandler = (value: number) => {
    setChkedBg(bgArr[value]);
  }
  const [viewClock, setViewClock] = useState(true);
  const [meridiem, setMeridiem] = useState(true);
  const [secs, setSecs] = useState(true);
  const switchClk = (value: boolean) => {
    setViewClock(value);
  }
  const switchMdm = (value: boolean) => {
    setMeridiem(value);
  }
  const switchSec = (value: boolean) => {
    setSecs(value);
  }

  const [viewGreeting, setViewGreeting] = useState(true);
  const switchGreet = (value: boolean) => {
    setViewGreeting(value);
  }
  const [useName, setUseName] = useState('');
  const getNameHandler = (value: string) => {
    setUseName(value);
  }

  const [viewWeather, setViewWeather] = useState(true);
  const [weathersInfo, setWeathersInfo] = useState<object>([]);
  const switchWeather = (value: boolean) => {
    setViewWeather(value);
  }
  const getWeatherInfo = (value: object) => {
    setWeathersInfo(value);
  } 
  return (
    <div className="App">
      <div className="wrapper">
        <Greeting
          viewClk={viewClock}
          setMeridiem={meridiem}
          setSecs={secs}
          viewGreet={viewGreeting}
          name={useName}
          getName={getNameHandler}
        />
        <Weather viewWeather={viewWeather} getWeatherInfo={getWeatherInfo} />
        <Todo />
      </div>
      <Settings 
        chkClockSwt={viewClock}
        showClockHandler={switchClk}
        bgs={bgArr} 
        chkBg={randomIdx} 
        chkImg={chkHandler} 
        chkMdmSwt={meridiem}
        showMdmHandler={switchMdm}
        chkSecSwt={secs}
        showSecHandler={switchSec}
        chkGreetSwt={viewGreeting}
        showGreetHandler={switchGreet}
        chkWeatherSwt={viewWeather}
        showWeatherHandler={switchWeather}
        weathers={weathersInfo}
      />
      <Background $url={chkedBg} />
    </div>
  );
}

export default App;
