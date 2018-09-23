const mongoose = require('mongoose');

const dbPath = process.env.PORT ? 'mongodb://tranhongnhi1993:M7kzEd9YDSNdLeB@ds211143.mlab.com:11143/todos' :
 'mongodb://localhost/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(dbPath, { useNewUrlParser: true }).catch(e => {
  console.log('connect to database error', e, dbPath);
}).then(() => {
  console.log('success connect to database', dbPath);
});

module.exports = {
  mongoose
}