const env = process.env.NODE_ENV || 'development';

console.log('Running server with env *** ',env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost/TodoAppTest';
} else {
  process.env.MONGODB_URI = 'mongodb://tranhongnhi1993:M7kzEd9YDSNdLeB@ds211143.mlab.com:11143/todos';
}