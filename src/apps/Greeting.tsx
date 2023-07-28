import Clock from './Clock';
import '../asset/style/greeting.scss';

interface Props {
  viewClk: boolean;
  setMeridiem: boolean;
  setSecs: boolean;
}
const Greeting = ({viewClk, setMeridiem, setSecs}: Props) => {
  return (
    <div className="greeting-wrap">
      {viewClk ? <Clock chkMeridiem={setMeridiem} chkSecs={setSecs} /> : null}
    </div>
  );
}

export default Greeting;