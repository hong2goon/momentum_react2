import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Clock from './Clock';
import editIcon from '../asset/images/icon/edit.svg';
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
    padding: 0.25rem 0.5rem;
    color: #fff;
    background: transparent;
    border: none;
  }

  &.input-name {
    input {
      width: 100%;
      max-width: 37.5rem;
      
      font-size: 3.375rem;
      line-height: 3.375rem;
      text-align: center;
      border-bottom: 0.125rem solid #fff;
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
  padding: 0.25rem 0.5rem;
  font-size: 3.375rem;
  line-height: 4rem;
  color: #fff;
  text-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);

  span:nth-of-type(2) {
    margin-left: 0.5rem;
  }
`;

const EditBtn = styled.button`
  display: inline-block;
  margin: 0.5rem 0 0 1rem;
  width: 3rem;
  height: 3rem;
  text-indent: -999rem;
  background: url(${editIcon}) 50% 100% no-repeat;
  background-size: 2.25rem;
  border: none;
  outline: none;
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  &:hover {
    opacity: 1;
  }
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

  const [greeting, setGreeting] = useState<string>('');
  
  useEffect(() => {
    const curr = setInterval(() => {
      setTimeout(() => {
        const curHour = new Date().getHours();
        if(curHour >= 21 || curHour < 6) {
          setGreeting('Good Night');
        } else {
          if(curHour > 18) {
            setGreeting('Good Evening');
          } else if(curHour >= 12) {
            setGreeting('Good Afternoon');
          } else {
            setGreeting('Good Morning');
          }
        }
      }, 1000);
    });
    return (() => {
      clearInterval(curr);
    });
  }, []);

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
            <span>{greeting}</span>, <span>{name}</span>
            <EditBtn type="button" onClick={toggleChgMode}>수정</EditBtn>
          </GreetMsg>
        }
      </form>
    </div>
  );
}

export default Greeting;