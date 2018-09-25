const expect = require('expect');
const request = require('supertest');
const {
  ObjectID
} = require('mongodb');

const {
  app
} = require('./../server');
const {
  Todo
} = require('./../models/todo');
const {
  User
} = require('./../models/user');

const { populateTodos, todos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((error, res) => {
        if (error) {
          done(error);
        }
        Todo.find({
          text
        }).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text);
          done();
        }).catch(e => {
          done(e);
        });
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch(done)
      })
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('should return 404 for todo not found', done => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 for non-object ids', done => {
    request(app)
      .get(`/todos/abc123`)
      .expect(400)
      .end(done)
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    const id = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(id).then(todo => {
          expect(todo).toBeNull();
          done();
        }).catch(done);
      });
  });

  it('should return 404 for id not found', done => {
    const hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    request(app)
      .get(`/todos/abc123`)
      .expect(400)
      .end(done)
  });
});

describe('UPDATE /todos/:id', () => {
  it('should update a todo', done => {
    const updateID = todos[0]._id.toHexString();
    const updatedData = {
      text: 'Message from updated data',
      complete: true
    }
    request(app)
      .patch(`/todos/${updateID}`)
      .send(updatedData)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(updateID);
        expect(res.body.text).toBe(updatedData.text);
        expect(res.body.complete).toBe(true);
        expect(res.body.completedAt).toBeTruthy();
      })
      .end(done);
  });

  it('should clear completedAt when complete is false', done => {
    const updateID = todos[0]._id.toHexString();
    const updatedData = {
      text: 'Message from updated data',
      complete: false
    }
    request(app)
      .patch(`/todos/${updateID}`)
      .send(updatedData)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(updateID);
        expect(res.body.text).toBe(updatedData.text);
        expect(res.body.complete).toBe(false);
        expect(res.body.completedAt).toBeNull();
      })
      .end(done);
  });
});

describe('GEt /users/me', () => {
  it('should return user if authenticated', done => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect(res => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });

  it('should return 401 if not authenticated', done => {
    request(app)
    .get('/users/me')
    .set('x-auth', '123abc!!!')
    .expect(401)
    .expect(res => {
      expect(res.body).toEqual({});
    })
    .end(done)
  });
});

describe('POST /users', () => {
  it('should create a user', done => {
    const email = 'example@example.com';
    const password = '123aaaaa!';
    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBeTruthy();
      expect(res.body.email).toEqual(email);
      expect(res.header['x-auth']).toBeTruthy();
    }).end(done);
  });

  it('should return validation errors if request invalid', done => {
    request(app)
    .post('/users')
    .send({email: 'asad', password: '123'})
    .expect(400)
    .end(done)
  });

  it('should not create user if email is in use', done => {
    request(app)
    .post('/users')
    .send({
      email: users[0].email,
      password: '2212121212'
    })
    .expect(400)
    .end(done)
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', done => {
    request(app)
    .post('/users/login')
    .send({
      email: users[1].email,
      password: users[1].password
    })
    .expect(200)
    .expect(res => {
      expect(res.header['x-auth']).toBeTruthy();
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      User.findById(users[1]._id).then(user => {
        expect(user.tokens[1].token).toBe(res.header['x-auth']);
        done();
      }).catch(done);
    });
  });

  it('should reject invalid login', done => {
    request(app)
    .post('/users/login')
    .send({
      email: '1112121212@maskdmad.com',
      password: 'users[1].password'
    })
    .expect(400)
    .expect(res => {
      expect(res.header['x-auth']).toBeUndefined();
    })
    .end(done);
  });
});