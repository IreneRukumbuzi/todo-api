import supertest from 'supertest';
import faker from 'faker';
import App from '../index';

const request = supertest(App);
let token;
let token2;
let todoId;

const user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.firstName()
}

const user2 = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.firstName()
}

const todo = {
  item: faker.lorem.sentence(),
}

describe('Testing the Todos Controller', () => {
  test('should signup the user', async done => {
    const res = await request.post('/signup').send(user);

    expect(res.status).toBe(201);
    done();
  });
  test('should signup the user', async done => {
    const res = await request.post('/signup').send(user2);

    expect(res.status).toBe(201);
    done();
  });



  test('should login the user', async done => {
    const res = await request.post('/login').send(user);

    token = res.body.token;
    expect(res.status).toBe(200);
    done();
  });
  test('should login the user', async done => {
    const res = await request.post('/login').send(user2);

    token2 = res.body.token;
    expect(res.status).toBe(200);
    done();
  });

  test('should return no token', async done => {
    const res = await request.post('/todos')

    expect(res.status).toBe(400);
    done();
  });

  test('should return invalid token', async done => {
    const res = await request.post('/todos').set('token', 'hdsjhdjs');

    expect(res.status).toBe(401);
    done();
  });

  test('should get todos', async done => {
    const res = await request.get('/todos').set('token', token);

    expect(res.status).toBe(200);
    done();
  });

  test('should not create a todo', async done => {
    const res = await request.post('/todos').send({item: ''}).set('token', token);

    expect(res.status).toBe(400);
    done();
  });

  test('should create a todo', async done => {
    const res = await request.post('/todos').send(todo).set('token', token);
 
    todoId = res.body.newTodo.id;
    expect(res.status).toBe(201);
    done();
  }) 

  test('should get one todo', async done => {
    const res = await request.get(`/todos/${todoId}`).set('token', token);

    expect(res.status).toBe(200);
    done();
  })

  test('should update one todo', async done => {
    const res = await request.patch(`/todos/${todoId}`).send(todo).set('token', token);

    expect(res.status).toBe(200);
    done();
  })
  test('should not update one todo', async done => {
    const res = await request.patch(`/todos/${faker.random.number()}`).send(todo).set('token', token);

    expect(res.status).toBe(401);
    done();
  })

  test('should return no item', async done => {
    const res = await request.patch(`/todos/${todoId}`).send(todo).set('token', token2);

    expect(res.status).toBe(401);
    done();
  })
  

  test('should delete todo', async done => {
    const res = await request.delete(`/todos/${todoId}`).set('token', token);

    expect(res.status).toBe(202);
    done();
  })

  test('should not delete todo', async done => {
    const res = await request.delete(`/todos/${todoId}`).set('token', token);

    expect(res.status).toBe(204);
    done();
  })

  test('it should return welcome', async (done) => {
    const res = await request.get('/');

    expect(res.status).toBe(200);
    done();
  });
})