import {useState, useEffect} from 'react';

interface Props {
  chkMeridiem: boolean;
  chkSecs: boolean;
}

const Clock = ({chkMeridiem, chkSecs}: Props) => {
  const [hours, setHours] = useState<number>(new Date().getHours());
  const [mins, setMins] = useState<number | string>(new Date().getMinutes() < 10 ? '0' + new Date().getMinutes(): new Date().getMinutes());
  const [secs, setSecs] = useState<number | string>(new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds());

  useEffect(() => {
    const curr = setInterval(() => {
      setTimeout(() => {
        setHours(new Date().getHours());
        setMins(new Date().getMinutes() < 10 ? '0' + new Date().getMinutes(): new Date().getMinutes());
        setSecs(new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds());
      }, 1000);
    });
    return (() => {
      clearInterval(curr);
    });
  }, []);

  return (
    <div className="clock-wrap">
      {chkMeridiem ? <span className="format">{hours > 12 ? `PM` : `AM`}</span> : null}
      <span className="times">
        {chkMeridiem ? <span className="hour">{hours > 12 ? hours - 12 : hours}</span> : <span className="hour">{hours}</span>}
        :<span className="minute">{mins}</span>
      </span>
      {chkSecs ? <span className="second">:{secs}</span> : null}
    </div>
  );
}

export default Clock;