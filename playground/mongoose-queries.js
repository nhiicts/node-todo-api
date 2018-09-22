const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

const id = '5ba4a815e91e9e709724b72a';

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});