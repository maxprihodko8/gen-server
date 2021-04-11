import express from "express";
import routes from './routes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(routes);

// error handler
app.use(function(err, req, res, next) {
  if (!process.env.PRODUCTION) {
    console.log(err.stack);

    res.status(err.status || 500);
  } else {
    next();
  }
});

export default app;