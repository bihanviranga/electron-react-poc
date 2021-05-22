const { Sequelize, DataTypes } = require('sequelize');

let seq = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  logging: (msg) => console.log('[Database]', msg),
});
console.log('[Database] Created database instance');

const Todo = seq.define('Todo', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
console.log('[Database] Defined user model:', Todo === seq.models.Todo);

module.exports.databaseConnection = seq;
