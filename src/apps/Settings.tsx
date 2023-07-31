import {useState} from 'react';
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
}

const SettingApp = ({
  chkClockSwt, 
  showClockHandler,
  bgs, 
  chkBg, 
  chkImg, 
  chkMdmSwt, 
  showMdmHandler, 
  chkSecSwt, 
  showSecHandler
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
    }
  }

  const handleLayer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = (e.currentTarget.href).split('#')[1];
    setSettingView(target);
  }

  return (
    <div className="setting-wrap">
      <div className="setting-container">
        <div className="setting-panel">
          <nav className="nav-wrap">
            <ul className="nav-menu">
              <li className={settingView === 'setting' ? 'nav-item act' : 'nav-item'}><a href="#setting" onClick={handleLayer}>Setting</a></li>
              <li className={settingView === 'background' ? 'nav-item act' : 'nav-item'}><a href="#background" onClick={handleLayer}>Background</a></li>
              <li className={settingView === 'clock' ? 'nav-item act' : 'nav-item'}><a href="#clock" onClick={handleLayer}>Clock</a></li>
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
          </section>
        </div>
      </div>
      <button type="button" className="btn-setting" onClick={ToggleClass}>설정</button>
    </div>
  );
}

export default SettingApp;