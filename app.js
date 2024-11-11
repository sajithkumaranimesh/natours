const express = require("express");
const app = express();
const morgan = require("morgan");

const tourRouter = require('./routs/tourRouter');
const userRouter = require('./routs/userRouter');

// 1) MIDDLEWARES

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log("Hello from the middlware !");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});



// 3) ROUTS
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 4) START SERVER
module.exports = app;