import styled from 'styled-components';

interface InputProps {
  name: string;
  value?: string;
  placeholder: string;
  // onChange: Function;
}

const Inputbox = styled.div`
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
      line-height: 58px;
      text-align: center;
      border-bottom: 2px solid #fff;
      border-radius: none;
      outline: none;

      &::placeholder {
        color: rgba(255,255,255,0.8);
      }
    }
  }
`;

function Input({name, value, placeholder}: InputProps) {
  const getInpVal = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  return (
    <Inputbox className={name}>
      <input type="text" value={value} placeholder={placeholder} onChange={getInpVal} />
    </Inputbox>
  )
}

export default Input;