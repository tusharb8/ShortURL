const mongoose = require(`mongoose`);
const connectDB = () => {
    try {
      //    console.log("connected to database");
      return mongoose
        .connect(process.env.MONGO_URL, {
        //   useNewUrlParser:true, useUnifiedTopology:true
        })
        .then(() => {
          console.log("connected to DB");
        });
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = connectDB;