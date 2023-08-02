import {useState} from 'react';
import styled from 'styled-components';
import Switch from '../components/Switch';
import BgImgRadio from '../components/BgImgRadio';
import '../asset/style/settings.scss';

interface Props {
  chkClockSwt: boolean;
  showClockHandler: Function;
  bgs: Array<string>;
  chkBg: number;
  chkImg: Function;
  chkMdmSwt: boolean;
  chkSecSwt: boolean;
  showMdmHandler: Function;
  showSecHandler: Function;
  chkGreetSwt: boolean;
  showGreetHandler: Function;
  chkWeatherSwt: boolean;
  showWeatherHandler: Function;
  weathers: object;
}

const WeatherInfoBox = styled.ul`
  margin: 1.5rem 0 0.25rem;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 0.625rem;
      color: rgba(255, 255, 255, .6);
      opacity: 1;

      strong {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.875rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
      }

      &.value {
        font-size: 1rem;
        color: rgba(255, 255, 255, 1);

        span {
          display: inline-block;
          font-size: inherit;
          color: inherit;

          & + span {
            margin-left: 0.5rem;
            font-size: 0.75rem;

            &.degree {
              margin-top: 0.063rem;
              margin-left: 0.25rem;
              font-size: 0.875rem;
              vertical-align: top;
            }
          }
        }
      }
    }

    & + li {
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 0.063rem solid rgba(255, 255, 255, 0.13);
    }
  }
`;

const SettingApp = ({
  chkClockSwt, 
  showClockHandler,
  bgs, 
  chkBg, 
  chkImg, 
  chkMdmSwt, 
  showMdmHandler, 
  chkSecSwt, 
  showSecHandler,
  chkGreetSwt,
  showGreetHandler,
  chkWeatherSwt,
  showWeatherHandler,
  weathers
}: Props) => {
  const [settingView, setSettingView] = useState<string>('setting');
  const ToggleClass = (e:React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const settingWrap = btn.closest('.setting-wrap');
    settingWrap?.classList.contains('act') ? settingWrap?.classList.remove('act') : settingWrap?.classList.add('act');
    setSettingView('setting');
  }

  const handleChange = (value?: number) => {
    chkImg(value);
  }

  const chkChangeHandler = (value: string, checked: boolean) => {
    if(value === 'clock') {
      showClockHandler(checked);
    } else if(value === 'meridiem') {
      showMdmHandler(checked);
    } else if(value === 'seconds') {
      showSecHandler(checked);
    } else if(value === 'greeting') {
      showGreetHandler(checked);
    } else if(value === 'weather') {
      showWeatherHandler(checked);
    }
  }

  const handleLayer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = (e.currentTarget.href).split('#')[1];
    setSettingView(target);
  }

  console.log(weathers);
  return (
    <div className="setting-wrap">
      <div className="setting-container">
        <div className="setting-panel">
          <nav className="nav-wrap">
            <ul className="nav-menu">
              <li className={settingView === 'setting' ? 'nav-item act' : 'nav-item'}><a href="#setting" onClick={handleLayer}>Setting</a></li>
              <li className={settingView === 'background' ? 'nav-item act' : 'nav-item'}><a href="#background" onClick={handleLayer}>Background</a></li>
              <li className={settingView === 'clock' ? 'nav-item act' : 'nav-item'}><a href="#clock" onClick={handleLayer}>Clock</a></li>
              <li className={settingView === 'weather' ? 'nav-item act' : 'nav-item'}><a href="#weather" onClick={handleLayer}>Weather</a></li>
            </ul>
          </nav>

          <section className="setting-view">
            <div className={settingView === 'setting' ? 'set-cont setting act' : 'set-cont setting'}>
              <h2 className="set-tit">Setting</h2>
              <span className="set-desc">Cumstom my board</span>
              <form>
                <h3 className="set-sub-tit">View Complications</h3>
                <ul className="set-list">
                  <li>
                    <strong className="label">Clock</strong>
                    <Switch value="clock" children="clock" defaultChecked={chkClockSwt} onChange={chkChangeHandler} />
                  </li>
                  <li>
                    <strong className="label">Greeting</strong>
                    <Switch value="greeting" children="greeting" defaultChecked={chkGreetSwt} onChange={chkChangeHandler} />
                  </li>
                  <li>
                    <strong className="label">Weather</strong>
                    <Switch value="weather" children="weather" defaultChecked={chkWeatherSwt} onChange={chkChangeHandler} />
                  </li>
                </ul>
              </form>
            </div>
            <div className={settingView === 'background' ? 'set-cont background act' : 'set-cont background'}>
              <h2 className="set-tit">Background</h2>
              <span className="set-desc">Setting background image</span>
              <form>
                <h3 className="set-sub-tit">Select Image</h3>
                <div className="d-flex gap-8 mt-16">
                  <BgImgRadio name="bgRad" value={0} defaultChecked={chkBg === 0} radImg={bgs[0]} imgAlt="background image0" onChange={handleChange} />
                  <BgImgRadio name="bgRad" value={1} defaultChecked={chkBg === 1} radImg={bgs[1]} imgAlt="background image1" onChange={handleChange} />
                  <BgImgRadio name="bgRad" value={2} defaultChecked={chkBg === 2} radImg={bgs[2]} imgAlt="background image2" onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className={settingView === 'clock' ? 'set-cont clock act' : 'set-cont clock'}>
              <h2 className="set-tit">Clock</h2>
              <span className="set-desc">Setting clock options</span>
              <form>
                <h3 className="set-sub-tit">Options</h3>
                <ul className="set-list">
                  <li>
                    <strong className="label">Meridiem<br />(12/24 hour)</strong>
                    <Switch value="meridiem" children="12/24 hour" defaultChecked={chkMdmSwt} onChange={chkChangeHandler} />
                  </li>
                  <li>
                    <strong className="label">show seconds</strong>
                    <Switch value="seconds" children="초" defaultChecked={chkSecSwt} onChange={chkChangeHandler} />
                  </li>
                </ul>
              </form>
            </div>
            <div className={settingView === 'weather' ? 'set-cont weather act' : 'set-cont weather'}>
              <h2 className="set-tit">Weather</h2>
              <span className="set-desc">Information is taken from OpenWeather API</span>
              <WeatherInfoBox className="weather-info">
                {(weathers as any).location !== undefined ?
                  <>
                    <li>
                      <span>
                        <strong>Location</strong>
                        현재위치
                      </span>
                      <span className="value">{(weathers as any).location}</span>
                    </li>
                  </>
                  : null
                }
                {(weathers as any).weather !== undefined ?
                  <>
                    <li>
                      <span>
                        <strong>Weather</strong>
                        날씨
                      </span>
                      <span className="value">
                        <span>{(weathers as any).weather}</span>
                        <span>({(weathers as any).weatherDesc})</span>
                      </span>
                    </li>
                  </>
                  : null
                }
                {(weathers as any).temperature !== undefined ?
                  <>
                    <li>
                      <span>
                        <strong>Temperature</strong>
                        현재기온
                      </span>
                      <span className="value">
                        <span>{(weathers as any).temperature}</span>
                        <span className="degree">℃</span>
                      </span>
                    </li>
                  </>
                  : null
                }
                {(weathers as any).tempFeelLike !== undefined ?
                  <>
                    <li>
                      <span>
                        <strong>Feel Like</strong>
                        체감온도
                      </span>
                      <span className="value">
                        <span>{(weathers as any).tempFeelLike}</span>
                        <span className="degree">℃</span>
                      </span>
                    </li>
                  </>
                  : null
                }
                {(weathers as any).tempMax !== undefined ?
                  <>
                    <li>
                      <span>
                        <strong>Max Temperature</strong>
                        최고 기온
                      </span>
                      <span className="value">
                        <span>{(weathers as any).tempMax}</span>
                        <span className="degree">℃</span>
                      </span>
                    </li>
                  </>
                  : null
                }
                {(weathers as any).tempMin !== undefined ?
                  <>
                    <li>
                      <span>
                        <strong>Min Temperature</strong>
                        최저 기온
                      </span>
                      <span className="value">
                        <span>{(weathers as any).tempMin}</span>
                        <span className="degree">℃</span>
                      </span>
                    </li>
                  </>
                  : null
                }
                {(weathers as any).sunrise !== undefined ?
                  <>
                    <li>
                      <span>
                        <strong>Sunrise</strong>
                        일출
                      </span>
                      <span className="value">{(weathers as any).sunrise}</span>
                    </li>
                  </>
                  : null
                }
                {(weathers as any).sunset !== undefined ?
                  <>
                    <li>
                      <span>
                        <strong>Sunset</strong>
                        일몰
                      </span>
                      <span className="value">{(weathers as any).sunset}</span>
                    </li>
                  </>
                  : null
                }
              </WeatherInfoBox>
            </div>
          </section>
        </div>
      </div>
      <button type="button" className="btn-setting" onClick={ToggleClass}>설정</button>
    </div>
  );
}

export default SettingApp;