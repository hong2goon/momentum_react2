import {useState} from 'react';
import styled from 'styled-components';
import Clock from './Clock';
import '../asset/style/greeting.scss';

interface Props {
  viewClk: boolean;
  setMeridiem: boolean;
  setSecs: boolean;
  name: string;
  getName: Function;
}

const InputName = styled.div`
  position: relative;
  
  input {
    padding: 4px 8px;
    color: #fff;
    background: transparent;
    border: none;
  }

  &.input-name {
    input {
      width: 100%;
      max-width: 600px;
      
      font-size: 54px;
      line-height: 54px;
      text-align: center;
      border-bottom: 2px solid #fff;
      border-radius: 0;
      outline: none;

      &::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
`;

const GreetMsg = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  font-size: 54px;
  line-height: 64px;
  color: #fff;
  text-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
`;


const Greeting = ({viewClk, setMeridiem, setSecs, name, getName}: Props) => {
  const [inpName, setInpName] = useState(name);
  const [inpMode, setInpMode] = useState('input');
  const getInpVal = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInpName(e.target.value);
  }
  const submitName = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getName(inpName);
    setInpMode('input');
  }
  const toggleChgMode = (e:React.MouseEvent<HTMLButtonElement>) => {
    setInpMode('edit');
  }
  return (
    <div className="greeting-wrap">
      {viewClk ? <Clock chkMeridiem={setMeridiem} chkSecs={setSecs} /> : null}
      <form className="form-name" onSubmit={submitName}>
        {name === '' || inpMode === 'edit' ?
          <InputName className="input-name">
            <input type="text" value={inpName} placeholder="What's your name?" onChange={getInpVal} />
          </InputName>
          : 
          <GreetMsg className="greeting-msg">
            <span>Good Morning</span>, <span>{name}</span>
            <button type="button" onClick={toggleChgMode}>수정</button>
          </GreetMsg>
        }
      </form>
    </div>
  );
}

export default Greeting;