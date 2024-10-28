require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
  mongoose.connection.close();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
})
.finally(() => {
  process.exit();
});