import { useState, useEffect } from 'react';

const Add = () => {
  const [allItems, setAllItems] = useState([]);
  const [todoItem, setTodoItem] = useState({
    todoName: undefined,
    todoDescription: undefined,
  });

  const createTodoItem = () => {
    window.ipcRenderer
      .invoke('addTodoItem', todoItem)
      .then(() => fetchTodoItems());
  };

  const fetchTodoItems = async () => {
    window.ipcRenderer.invoke('fetchTodoItems').then((res) => {
      console.log(res);
      const fetchedItems = res.map((item) => item.dataValues);
      setAllItems(fetchedItems);
    });
  };

  const deleteTodoItem = (id) => {
    window.ipcRenderer
      .invoke('deleteTodoItem', id)
      .then(() => fetchTodoItems());
  };

  useEffect(() => {
    fetchTodoItems();
  }, []);

  useEffect(() => {
    console.log('All items', allItems);
  }, [allItems]);

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

      <hr />
      <table>
        <tbody>
          {allItems.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <code>{item.description}</code>
                </td>
                <td>
                  <button onClick={() => deleteTodoItem(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Add;
