import { useState } from 'react';
import styled from 'styled-components';
import TodoIcon from '../asset/images/icon/checklist.svg';

const TodoInpWrap = styled.div<{$icon: string}>`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
  color: #fff;
  text-align: right;
  z-index: 9;

  .toggle-todo {
    position: relative;
    padding-left: 2rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.75rem;
    background: transparent;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.7s ease-in-out;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 1.75rem;
      height: 1.75rem;
      background: url(${props => props.$icon}) 50% 50% no-repeat;
      background-size: auto 1.75rem;
    }

    &:hover {
      opacity: 1;
    }
  }

  .Todo-inp-box {
    position: absolute;
    bottom: 2.75rem;
    right: 0;
    width: 300px;
    padding: 1rem;
    color: #fff;
    background: rgba(0, 0, 0, .8);
    border-radius: 0.5rem;
    opacity: 0;
    transform: translateX(150%);
    transition: all 0.5s ease-in-out;

    &.act {
      opacity: 1;
      transform: translateX(0);
    }

    h2 {
      display: block;
      margin: 0.25rem 0.625rem 1rem;
      font-size: 1.125rem;
      font-weight: normal;
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
    }

    .todo-form {
      input {
        margin-bottom: 0.75rem;
        padding: 0.25rem;
        font-size: 1rem;
        line-height: 1.875rem;
        width: 100%;
        color: #fff;
        background: #000;
        border: none;
        border-bottom: 0.063rem solid rgba(255, 255, 255, 0.4);
        border-radius: 0;
        outline: none;
        box-sizing: border-box;

        &:focus {
          border-bottom: 0.063rem solid rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
`;

const Todo = () => {
  const [todoValue, setTodoValue] = useState('');
  const toggleHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const todoInpBox = e.currentTarget.nextElementSibling as HTMLElement;
    const todoInpForm = todoInpBox.querySelector('form') as HTMLElement;
    const todoFormCN = todoInpForm.classList.value;
    todoInpBox.classList.contains('act') ? todoInpBox.classList.remove('act') : todoInpBox.classList.add('act');
    inpReset(todoFormCN);
  }

  const onChangeTodo = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.currentTarget.value);
  }

  const onSubmitTodo = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //inpReset();
    console.log(todoValue);
  }

  const inpReset = (inp: string) => {
    console.log(inp);
    setTodoValue('');
  }

  return (
    <div className="todo-wrap">
      <TodoInpWrap $icon={TodoIcon}>
        <button type="button" className="toggle-todo" onClick={toggleHandler}>ToDo</button>
        <div className="Todo-inp-box">
          <h2>Add a todo to get start</h2>
          <form className="todo-form" onSubmit={onSubmitTodo}>
            <input type="text" placeholder="Enter a to-do." onChange={onChangeTodo} />
          </form>
        </div>
      </TodoInpWrap>
    </div>
  );
}

export default Todo;