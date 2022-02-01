const mongoose = require('mongoose');
require('dotenv').config();

const dbClient = () => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.pluralize(null);

  return mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`Connected to MongoDB`);
      const db = mongoose.connection;
      db.on('error', (err) => {
        console.log(`MongoDB connection error: ${err}}`);
      });
      return db.getClient();
    })
    .catch((err) => {
      console.log(`MongoDB connection error: ${err}}`);
    });
};


module.exports = dbClient;

