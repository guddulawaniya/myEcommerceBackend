const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "mkshoppingzonedb",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
<<<<<<< HEAD
=======
    console.log('MongoDB connected successfully');
>>>>>>> bc32ebeacccd7e7eed030fd2a282441fec3efdc2
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
