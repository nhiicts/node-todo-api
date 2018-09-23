const mongoose = require('mongoose');

const dbPath = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(dbPath, { useNewUrlParser: true }).catch(e => {
  console.log('connect to database error', e, dbPath);
}).then(() => {
  console.log('success connect to database', dbPath);
});

module.exports = {
  mongoose
}