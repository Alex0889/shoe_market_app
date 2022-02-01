const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParcer = require('cookie-parser');
const MongoStore = require('connect-mongo');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const router = require('./routes');
const dbClient = require('./db');


const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));

app.use(express.json());
app.use(cookieParcer());
app.use(session({
  secret: process.env.SECRET_SESSION,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ client: dbClient() }),
  cookie: {maxAge: 60 * 1000}
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})

app.use('/api', router);

app.use(errorHandlerMiddleware);

const start = () => {
  app.listen(PORT, () => {
    console.log('Server is listening on ' + PORT);
  })
}

start();
