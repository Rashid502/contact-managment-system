const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI');

const mongoURL = "mongodb://localhost:27017/contactsdb";


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    console.log("Error occured in connection MongoDB");
    process.exit(1);
  }
};

module.exports = connectDB;