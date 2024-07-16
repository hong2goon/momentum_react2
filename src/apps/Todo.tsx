import { useState } from 'react';
import styled from 'styled-components';
import TodoIcon from '../asset/images/icon/checklist.svg';
import TodoItem from './TodoItem';
const TodoInpWrap = styled.div<{$icon: string}>`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1.6rem;
  color: #fff;
  text-align: right;
  z-index: 101;

  .toggle-todo {
    position: relative;
    padding-left: 3.2rem;
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    line-height: 2.8rem;
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
      width: 2.8rem;
      height: 2.8rem;
      background: url(${props => props.$icon}) 50% 50% no-repeat;
      background-size: auto 2.8rem;
    }

    &:hover {
      opacity: 1;
    }
  }

  .Todo-inp-box {
    position: absolute;
    bottom: 4.4rem;
    right: 0;
    width: 30rem;
    padding: 1.6rem;
    color: #fff;
    background: rgba(0, 0, 0, .8);
    border-radius: 0.8rem;
    opacity: 0;
    transform: translateX(150%);
    transition: all 0.5s ease-in-out;

    &.act {
      opacity: 1;
      transform: translateX(0);
    }

    h2 {
      display: block;
      margin: 0.4rem 1rem 1.6rem;
      font-size: 1.8rem;
      font-weight: normal;
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
    }

    .todo-form {
      input {
        margin-bottom: 1.2rem;
        padding: 0.4rem;
        font-size: 1.6rem;
        line-height: 3rem;
        width: 100%;
        color: #fff;
        background: #000;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
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

const TodoListWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding:0 1.2rem;

  ul {
    width:100%;
    max-width:58rem;
    margin: 0;
    padding: 0;
    background:rgba(0, 0, 0, 0.3);
    border-radius: 0.4rem;
    list-style: none;
  }
`;

interface TodoList {
  id: number;
  chk: boolean; 
  value: string;
}

const Todo = () => {
  const [todoValue, setTodoValue] = useState<string>('');
  const [todos, setTodos] = useState<TodoList[]>([]);
  const toggleHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const todoInpBox = e.currentTarget.nextElementSibling as HTMLElement;
    const setWrap = document.querySelector('.setting-wrap') as HTMLDivElement;
    todoInpBox.classList.contains('act') ? todoInpBox.classList.remove('act') : todoInpBox.classList.add('act');
    if(setWrap.classList.contains('act')) {
      setWrap.classList.remove('act');
      setTimeout(() => {
        setWrap.classList.remove('block');
      }, 1000);
    }
  }

  const onChangeTodo = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.currentTarget.value);
  }

  const onSubmitTodo = (e:React.FormEvent<HTMLFormElement>) => {
    const value = todoValue;
    const inp = e.currentTarget.querySelector('input') as HTMLInputElement;
    const inpVal = inp.value;
    
    const newTodos: TodoList = {
      id: todos.length + 1,
      chk: false,
      value: value
    };
    setTodos([...todos, newTodos]);
    inpReset(inpVal); //value 초기화
    e.preventDefault(); //기본이벤트(새로고침) 방지
  }

  const inpReset = (inp: string) => {
    const todoInp = document.querySelector('.todo-form > input') as HTMLInputElement;
    todoInp.value = '';
    setTodoValue('');
  }

  const todoChk = (id: number, checked: boolean, value: string) => {
    const chkTodos: TodoList = {
      id: id,
      chk: checked,
      value: value
    };

    const updateTodos = todos.map((item) => {
      if(item.id === chkTodos.id) {
        return chkTodos;
      } else {
        return item;
      }
    })
    setTodos(updateTodos);
  }

  const todoDel = (id: number) => {
    let delItem: TodoList[] = todos.filter((item) => item.id !== id);
    delItem.map((item, index) => {
      if(item.id > index + 1) {
        return item.id = item.id - 1;
      }
    })
    setTodos(delItem);
  }

  return (
    <div className="todo-wrap">
      <TodoInpWrap $icon={TodoIcon}>
        <button type="button" className="toggle-todo" onClick={toggleHandler}>ToDo</button>
        <div className="Todo-inp-box">
          <h2>Add a todo to get start</h2>
          <form className="todo-form" onSubmit={onSubmitTodo}>
            <input type="text" placeholder="Enter a to-do." value={todoValue} onChange={onChangeTodo} />
          </form>
        </div>
      </TodoInpWrap>

      <TodoListWrap className='todo-list'>
        <ul>
          {todos.map((item) => (
            <TodoItem id={item.id} checked={item.chk} text={item.value} key={item.id} onChange={todoChk} onClick={todoDel} />
          ))}
        </ul>
      </TodoListWrap>
    </div>
  );
}

export default Todo;