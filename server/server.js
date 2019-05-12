import express from 'express';
import morgan from 'morgan';
import parser from 'body-parser';
import users from './routes/users';
import loans from './routes/loan';
// import admin from './routes/admin';


const app = express();
app.use(morgan('dev')); // To get the http response

// middle ware for req and res
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// API ROUTES

app.use('/api/v1/auth', users);
app.use('/api/v1', loans);
// app.use('/api/v1/admin', admin);

// To get to your home root server
app.use('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Quick Credit ',
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('The port is listening');
});


module.exports = app;
