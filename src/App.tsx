import React,{ useState } from 'react';
import Settings from './apps/Settings';
import Greeting from './apps/Greeting';
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
  
  return (
    <div className="App">
      <div className="wrapper">
        <Greeting />
        <Settings bgs={bgArr} chkBg={randomIdx} chkImg={chkHandler} />
      </div>
      <Background $url={chkedBg} />
    </div>
  );
}

export default App;
