import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/index';

const App = express();

const Port = process.env.Port || 5000;

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

App.use(cors());

App.use(router);

App.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to my Todo API' });
});

App.listen(Port, () => {
  console.log(`App listening on Port ${Port}...`);
});
