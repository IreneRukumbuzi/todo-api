import App from '../index';
import faker from 'faker';
import supertest from 'supertest';

const request = supertest(App);

const userFix = {
  name: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('Testing Auth route', () => {
  
  test('should signup the user', async done => {
    const res = await request.post('/signup').send(userFix);
    
    expect(res.status).toBe(201);
    done();
  })

  test('should return user already exists', async done => {
    const res = await request.post('/signup').send(userFix);

    expect(res.status).toBe(409);
    done();
  })

  test('should not sign up the user', async done => {
    const res = await request.post('/signup').send({
      name: '',
      password: 'jhds',
      email: 'dsdhjs'
    })

    expect(res.status).toBe(400);
    done();
  })

  test('should log in the user', async done => {
    const res = await request.post('/login').send({...userFix});

    expect(res.status).toBe(200);
    done();
  })

  test('should return invalid credentials', async done => {
    const res = await request.post('/login').send({
      email: 'umutekano21@gmail.com',
      password: 'dvsghs' 
     });

    expect(res.status).toBe(401);
    done();
  })
})
