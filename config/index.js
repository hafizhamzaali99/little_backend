const mongoose = require("mongoose");
require("dotenv").config(); 
const connectDatabase = async () => {
  mongoose
    .connect(process.env.MONGODB_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database is connected to ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(error); // if solving unhandle promise rejection issue in server.js so dont need to use catch
    });
};
module.exports = connectDatabase;
