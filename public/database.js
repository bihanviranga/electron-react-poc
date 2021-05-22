const { Sequelize, DataTypes } = require('sequelize');

let seq = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  logging: (msg) => console.log('[Database]', msg),
});
console.log('[Database] Created database instance');

const Todo = seq.define(
  'Todo',
  {
    // model attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, //default
    },
  },
  {
    // other model options
    seq,
  }
);
console.log('[Database] Defined user model:', Todo === seq.models.Todo);

// With alter:true, the table in the DB
// is changed to match the model if necessary
Todo.sync({ alter: true })
  .then(() => console.log('[Database] Todo model sync complete'))
  .catch((e) => console.log('[Database] Todo model sync failed', e));

const addTodoItem = async (todoItem) => {
  const todo = await Todo.create({
    name: todoItem.todoName,
    description: todoItem.todoDescription,
  });
  console.log('[Database] (TODO) ADD:', todo.toJSON());
};

const fetchTodoItems = async () => {
  const items = Todo.findAll({
    attributes: ['id', 'name', 'description'],
  });
  console.log('[Database] (TODO) FETCH called');
  return items;
};

const deleteTodoItems = (id) => {
  Todo.destroy({
    where: {
      id: id,
    },
  })
    .then(() => console.log('[Database] (TODO) DELETE successful', id))
    .catch(() => console.log('[Database] (TODO) DELETE failed', id));
};

module.exports.databaseConnection = seq;
module.exports.addTodoItem = addTodoItem;
module.exports.fetchTodoItems = fetchTodoItems;
module.exports.deleteTodoItem = deleteTodoItems;
