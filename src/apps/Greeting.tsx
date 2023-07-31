import {useState} from 'react';
import Clock from './Clock';
import Input from '../components/Input';
import '../asset/style/greeting.scss';


interface Props {
  viewClk: boolean;
  setMeridiem: boolean;
  setSecs: boolean;
  name: string;
}



const Greeting = ({viewClk, setMeridiem, setSecs, name}: Props) => {
  const [getName, setGetName] = useState(name);
  const getInpVal = (e:React.ChangeEvent<HTMLInputElement>) => {
    setGetName(e.target.value);
  }
  return (
    <div className="greeting-wrap">
      {viewClk ? <Clock chkMeridiem={setMeridiem} chkSecs={setSecs} /> : null}
      <form>
        {/* <Input 
          name="input-name" 
          value="" 
          placeholder="What's your name?" 
          // onChange={inpChangeHandler} 
        /> */}
        <input type="text" value={getName} placeholder="What's your name?" onChange={getInpVal} />
      </form>
    </div>
  );
}

export default Greeting;