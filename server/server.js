import express from 'express';
import morgan from 'morgan';
import parser from 'body-parser';
import routes from './routes/index';
import repaymentRouter from './routes/Repayment';


const app = express();
app.use(morgan('dev')); // To get the http response

// middle ware for req and res
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// API ROUTES

app.use('/api/v1', routes.userRouter);
app.use('/api/v1', routes.loanRouter);
app.use('/api/v1', repaymentRouter);

// To get to your home root server
app.use('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Quick Credit ',
  });
});

const port = process.env.PORT || 6008;

app.listen(port, () => {
  console.log('The port is listening');
});


module.exports = app;
