import styled from 'styled-components';
import delIcon from '../asset/images/icon/delete.svg';

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 0.6rem 0;
  margin: 0 0.6rem;

  &:not(:only-child):not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  & + li.item {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .chk {
    position: relative;
    width: 3.6rem;
    height: 3.6rem;

    input[type="checkbox"] {
      position:absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 1px;
      opacity: 0;
    }
      
    label.chkbox {
      position: relative;
      display:block;
      width: 2.8rem;
      height: 2.8rem;
      margin: 0.4rem;
      border: none;
      border-radius: 0.8rem;
      background:rgba(0, 0, 0, 0.15);
      box-shadow: 0.2rem 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.3) inset;

      &::after {
        content:'✔';
        position: absolute;
        top: 50%;
        left: 50%;
        font-size:1.8rem;
        color: #fff;
        transform: translate(-50%, -50%);
        opacity: 0.2;
        transition: opacity 0.7s ease-in-out;
      }
    }

    input[type="checkbox"]:checked + label.chkbox::after {
      opacity: 1;
    }
  }

  p {
    flex: 1; 
    margin: 0;
    padding: 0 1.6rem;
    font-size:1.6rem;
    color: rgba(255, 255, 255, 1);
    transition: all 0.25s ease-in-out; 
  }

  .btn {
    width: 3.6rem;
    height: 3.6rem;

    .btn-del {
      display: block;
      width: 2.8rem;
      height: 2.8rem;
      margin: 0.4rem;
      border: none;
      background: url(${delIcon}) 50% 50% no-repeat;
      background-size: 2.8rem;
      text-indent: -9999px;
      opacity: 0.4;
      overflow: hidden;
      transition: opacity 0.5s ease-in-out; 

      &:hover {
        opacity: 1;
      }
    }
  }

  &.complete {
    p {
      color: rgba(0, 0, 0, 0.3);
      text-decoration: line-through;
    }
  }
`;

// const TodoList = ({todos}: Props) => {

//   const checkHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
//     console.log(e.target.checked, todos)
//   }

//   return (
//     <List>
//       {todos.map((todoItem, index) => {
//         let idx: number = index;
//         let strIdx = "chk" + idx as unknown as string;
//         return (
//           <li className="item" key={index}>
//             <div className="chk">
//               <input type="checkbox" id={strIdx} onChange={checkHandler}/>
//               <label className="chkbox" htmlFor={strIdx} />
//             </div>
//             <p>{todoItem}</p>
//             <div className="btn">
//               <button type="button" className="btn-del">Del</button>
//             </div>
//           </li>
//         );
//       })}
//     </List>
    
//   );
// }

interface Props {
  id: number,
  checked: boolean,
  text: string,
  onChange: Function
}

const TodoItem = ({id, checked, text, onChange}: Props) => {
  const checkHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.checked, text);
    e.target.checked ? e.target.closest('li')?.classList.add('complete') : e.target.closest('li')?.classList.remove('complete');
  }
  let strIdx = "chk" + id as unknown as string;

  return (
    <Item className={checked ? 'item complete' : 'item'}>
      <div className="chk">
        <input type="checkbox" id={strIdx} checked={checked} onChange={checkHandler} />
        <label className="chkbox" htmlFor={strIdx} />
      </div>
      <p>{text}</p>
      <div className="btn">
        <button type="button" className="btn-del">Del</button>
      </div>
    </Item>
  );
}

export default TodoItem;