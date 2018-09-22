const mongoose = require('mongoose');

const dbPath = 'mongodb://tranhongnhi1993:M7kzEd9YDSNdLeB@ds211143.mlab.com:11143/todos';

mongoose.Promise = global.Promise;
mongoose.connect(dbPath, { useNewUrlParser: true }).catch(e => {
  console.log('connect to database error', e);
}).then(() => {
  console.log('success connect to mlab database');
});

module.exports = {
  mongoose
}