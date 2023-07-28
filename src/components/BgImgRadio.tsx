
import styled from 'styled-components';

interface RadioProps {
  value: number;
  name: string;
  defaultChecked?: boolean;
  radImg: string;
  imgAlt: string;
  onChange: Function;
}

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

function BgImgRadio({value, name, defaultChecked, radImg, imgAlt, onChange}: RadioProps) {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }
  return (
    <Label>
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} onChange={handleChange}/>
      <span>
        <img src={radImg} alt={imgAlt} />
      </span>
    </Label> 
  )
}

export default BgImgRadio;