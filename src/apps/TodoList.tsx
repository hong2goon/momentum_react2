import styled from 'styled-components';

interface Props {
  todos: string[];
}
const List = styled.ul`
  margin-top: -2.4rem;
  padding: 0;
  background:rgba(0, 0, 0, 0.3);
  border-radius: 0.4rem;
  list-style: none;

  li.item {
    display: flex;
    padding: 0.6rem 0;
    margin: 0 0.6rem;

    &:not(:only-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }

    & + li.item {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .chk {
      width: 4rem;
    }
  }
`;

const TodoList = ({todos}: Props) => {
  return (
    <List>
      {todos.map((todoItem, index) => {
        return (
          <li className="item" key={index}>
            <div className="chk">
              <input type="checkbox" />
            </div>
            <p>{todoItem}</p>
            <div className="btn">
              <button type="button" className="btn-del">Del</button>
            </div>
          </li>
        );
      })}
    </List>
    
  );
}

export default TodoList;