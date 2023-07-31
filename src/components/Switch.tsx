import styled from 'styled-components';

interface RadioProps {
  value: string;
  defaultChecked?: boolean;
  children: string;
  onChange: Function;
}

const ToggleSwitch = styled.div`
  position: relative;
  
  label {
    position: relative;
    display: inline-block;
    width: 3rem;
    height: 1.75rem;
    
    input {
      position: absolute;
      top: 0; 
      left: 0;
      width: 0.063rem; 
      height: 0.063rem;
      opacity: 0;

      & + span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        text-indent: -9999rem;
        background: #fff;
        border-radius: 0.875rem;
        box-shadow: inset 0 0.15rem 0.25rem rgba(0,0,0,0.5);
        transition: background 0.5s ease-in-out;

        &::before {
          content: '';
          position: absolute;
          top: 0.125rem;
          left: 0.125rem;
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0.25rem 0.5rem rgba(0,0,0,0.5);
          transition: left 0.5s ease-in-out;
        }
      }

      &:checked {
        & + span {
          background: #40c057;

          &::before {
            left: 1.375rem;
          }
        }
      }
    }
  }
`;

function Switch({value, defaultChecked, children, onChange}: RadioProps) {
  const switchHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, e.target.checked);
  }
  return (
    <ToggleSwitch className="switch">
      <label>
        <input type="checkbox" value={value} checked={defaultChecked} onChange={switchHandler} />
        <span>{children}</span>
      </label>
    </ToggleSwitch>
  )
}

export default Switch;