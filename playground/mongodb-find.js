const {MongoClient, ObjectID} = require('mongodb');

const obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
   return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');
  // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }).catch(error => {
  //   console.log('Unable to fetch todos', error);
  // })
  db.collection('Todos').find().count().then((count) => {
    console.log('Todos');
    console.log(`Todos count: ${count}`);
  }).catch(error => {
    console.log('Unable to fetch todos', error);
  })
  
  //client.close();
});