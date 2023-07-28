import {useState} from 'react';
import styled from 'styled-components';
import bgImg1 from '../asset/images/background/1.jpg';
import bgImg2 from '../asset/images/background/2.jpg';
import bgImg3 from '../asset/images/background/3.jpg';

interface RadioProps {
  value: number;
}

const bgArr = [bgImg1, bgImg2, bgImg3];
const Label = styled.label`
  position: relative;
  display: blck;
  width: 5rem;
  height: 5rem;
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;

    & + span {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      border: 2px solid tranparent;
      border-radius: 0.5rem;
      overflow: hidden;
      opacity: .7;
      transition: opacity .5s ease-in-out;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 100%;
        max-height: 100%;
        transform: translate(-50%, -50%);
      }
    }

    &:checked + span {
      border: 2px solid #fff;
      opacity: 1;
    }
  }
`;

function BgImgRadio({value}: RadioProps) {
  const bgImg = bgArr[value];
  const bgAlt = `background${value}`;
  const [chkBg, setChkBg] = useState(0);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChkBg(parseInt(e.target.value));
  }

  return (
    <Label>
      <input type="radio" name="bgRad" value={value} checked={chkBg === value ? true : false} onChange={changeHandler} />
      <span>
        <img src={bgImg} alt={bgAlt} />
      </span>
    </Label> 
  );
}

export default BgImgRadio;