const express = require("express");
const app = express();
const users = require("./routes/userRoute");
const property = require("./routes/propertyRoute");
const { errorMiddleware } = require("./middlewares/error");

app.use(express.json());

app.use("/api/v1/users/", users);
app.use("/api/v1/property/", property);

app.use(errorMiddleware);

module.exports = app;
