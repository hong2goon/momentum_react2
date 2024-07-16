import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Clock from './Clock';
import editIcon from '../asset/images/icon/edit.svg';
import '../asset/style/greeting.scss';

interface Props {
  viewClk: boolean;
  setMeridiem: boolean;
  setSecs: boolean;
  viewGreet: boolean;
  name: string;
  getName: Function;
}

const InputName = styled.div`
  position: relative;
  padding:0 1.2rem;
  
  input {
    padding: 0.5rem 1rem;
    color: #fff;
    background: transparent;
    border: none;
  }

  &.input-name {
    input {
      width: 100%;
      max-width: 58rem;
      
      font-size: 5.4rem;
      line-height: 5.4rem;
      text-align: center;
      border-bottom: 1px solid #fff;
      border-radius: 0;
      outline: none;

      &::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  @media (max-width: 520px) {
    &.input-name {
      input {
        font-size: calc(10vw);
        line-height: calc(10vw);
      }
    }
  }
`;

const GreetMsg = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding:0 1.2rem;
  font-size: 5.4rem;
  line-height: 6rem;
  color: #fff;
  text-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);

  span {
    display:flex;
    max-height: 5.4rem;
  }
  span:nth-of-type(2) {
    display: flex;
    align-items: flex-end;
    margin-left: 0.8rem;
  }

  @media (max-width: 520px) {
    font-size: calc(10vw);
    line-height: calc(10vw);
  }
`;

const EditBtn = styled.button`
  display: block;
  width: 4.6rem;
  height: 4.6rem;
  text-indent: -999rem;
  background: url(${editIcon}) 50% 100% no-repeat;
  background-size: 3.6rem;
  border: none;
  outline: none;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.5s ease-in-out;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 520px) {
    width: calc(9vw);
    height: calc(9vw);
    background-size: calc(8vw);
  }
`;

const Greeting = ({viewClk, setMeridiem, setSecs, viewGreet, name, getName}: Props) => {
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
          setGreeting('Good Night,');
        } else {
          if(curHour > 18) {
            setGreeting('Good Evening');
          } else if(curHour >= 12) {
            setGreeting('Good Afternoon,');
          } else {
            setGreeting('Good Morning,');
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
      {viewGreet ? 
        <form className="form-name" onSubmit={submitName}>
          {name === '' || inpMode === 'edit' ?
            <InputName className="input-name">
              <input type="text" value={inpName} placeholder="What's your name?" onChange={getInpVal} />
            </InputName>
            : 
            <GreetMsg className="greeting-msg">
              <span>{greeting}</span>
              <span>
                <span>{name}</span>
                <EditBtn type="button" onClick={toggleChgMode}>수정</EditBtn>
              </span>
            </GreetMsg>
          }
        </form>
        : null
        }
    </div>
  );
}

export default Greeting;