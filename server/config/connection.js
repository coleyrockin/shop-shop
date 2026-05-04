const mongoose = require('mongoose');

mongoose.set('sanitizeFilter', true);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mernshopping');

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.message);
});

module.exports = mongoose.connection;
