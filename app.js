import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from "morgan";
import expressLayouts from 'express-ejs-layouts';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config()

import indexRouter from "./routes/index.js";
import productRouter from "./routes/productRouter.js"

const app = express();

mongoose.set("strictQuery", false)

const db = process.env.CONN_LOCAL

async function main(){
  const conn = await mongoose.connect(db)

  if (conn) console.log("Database successfully connected");
}

main().catch(err => console.error(err))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { layout: false });
});

export default app;
