const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

Todo.deleteMany({}).then((result) => {
  console.log('delete all todos success ', result);
}).catch(e => {
  console.log('delete all todos failed ', e);
});