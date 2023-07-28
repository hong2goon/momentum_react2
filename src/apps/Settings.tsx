import BgImgRadio from '../components/BgImgRadio';
import '../asset/style/settings.scss';

interface Props {
  bgs: Array<string>;
  chkBg: number;
  chkImg: Function;
}

const SettingApp = ({bgs, chkBg, chkImg}: Props) => {
  const ToggleClass = (e:React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const settingWrap = btn.closest('.setting-wrap');
    settingWrap?.classList.contains('act') ? settingWrap?.classList.remove('act') : settingWrap?.classList.add('act');
  }

  const handleChange = (value?: number) => {
    chkImg(value);
  }

  return (
    <div className="setting-wrap">
      <button type="button" className="btn-setting" onClick={ToggleClass}>설정</button>
      <div className="setting-container">
        <div className="d-flex gap-8">
          <BgImgRadio name="bgRad" value={0} defaultChecked={chkBg === 0} radImg={bgs[0]} imgAlt="background image0" onChange={handleChange} />
          <BgImgRadio name="bgRad" value={1} defaultChecked={chkBg === 1} radImg={bgs[1]} imgAlt="background image1" onChange={handleChange} />
          <BgImgRadio name="bgRad" value={2} defaultChecked={chkBg === 2} radImg={bgs[2]} imgAlt="background image2" onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default SettingApp;