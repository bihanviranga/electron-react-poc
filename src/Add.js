import { useState } from 'react';

const Add = () => {
  const [todoItem, setTodoItem] = useState({
    todoName: undefined,
    todoDescription: undefined,
  });

  const createTodoItem = () => {
    window.ipcRenderer.invoke('addTodoItem', todoItem);
  };

  return (
    <div>
      <h1>Add todo item</h1>

      <div>
        <label htmlFor="todoName">Name</label>
        <input
          name="todoName"
          type="text"
          onChange={(e) =>
            setTodoItem({ ...todoItem, todoName: e.target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="todoDescription">Description</label>
        <input
          name="todoDescription"
          onChange={(e) =>
            setTodoItem({ ...todoItem, todoDescription: e.target.value })
          }
        />
      </div>

      <button onClick={createTodoItem}>Add</button>
    </div>
  );
};

export default Add;
