const mongoose = require('mongoose');

const dbPath = 'mongodb://tranhongnhi1993:M7kzEd9YDSNdLeB8k@ds211143.mlab.com:11143/todos';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || dbPath, { useNewUrlParser: true });

module.exports = {
  mongoose
}