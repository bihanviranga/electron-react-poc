import { useState, useEffect } from 'react';

const Add = () => {
  // this can be either 'add' or 'edit'
  const [formMode, setFormMode] = useState('add');
  const [allItems, setAllItems] = useState([]);
  const [todoItem, setTodoItem] = useState({
    todoId: undefined,
    todoName: undefined,
    todoDescription: undefined,
  });

  const formReset = () => {
    setTodoItem({
      todoId: undefined,
      todoName: undefined,
      todoDescription: undefined,
    });
    setFormMode('add');
  };

  const createTodoItem = () => {
    window.ipcRenderer.invoke('addTodoItem', todoItem).then(() => {
      fetchTodoItems();
      formReset();
    });
  };

  const fetchTodoItems = async () => {
    window.ipcRenderer.invoke('fetchTodoItems').then((res) => {
      const fetchedItems = res.map((item) => item.dataValues);
      setAllItems(fetchedItems);
    });
  };

  const deleteTodoItem = (id) => {
    window.ipcRenderer
      .invoke('deleteTodoItem', id)
      .then(() => fetchTodoItems());
  };

  const setSelectedTodoItem = (id) => {
    const selectedItem = allItems.find((item) => item.id === id);
    setTodoItem({
      todoId: selectedItem.id,
      todoName: selectedItem.name,
      todoDescription: selectedItem.description,
    });
    setFormMode('edit');
  };

  const editTodoItem = () => {
    window.ipcRenderer.invoke('editTodoItem', todoItem).then(() => {
      fetchTodoItems();
      formReset();
    });
    setFormMode('add');
  };

  useEffect(() => {
    fetchTodoItems();
  }, []);

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
          value={todoItem.todoName || ''}
        />
      </div>

      <div>
        <label htmlFor="todoDescription">Description</label>
        <input
          name="todoDescription"
          onChange={(e) =>
            setTodoItem({ ...todoItem, todoDescription: e.target.value })
          }
          value={todoItem.todoDescription || ''}
        />
      </div>

      {formMode === 'add' && <button onClick={createTodoItem}>Add</button>}
      {formMode === 'edit' && <button onClick={editTodoItem}>Update</button>}
      <button onClick={formReset}>Clear</button>

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
                  <button onClick={() => setSelectedTodoItem(item.id)}>
                    Edit
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
