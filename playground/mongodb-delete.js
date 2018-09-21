const {MongoClient, ObjectID} = require('mongodb');

const obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
   return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');
  db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    console.log(result);
  }).catch(e => {
    console.log('Unable delete todos');
  });
  //client.close();
});