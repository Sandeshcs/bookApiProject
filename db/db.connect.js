const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGODB;
const connectToDb = async () => {
    await mongoose
    .connect(mongoUri)
    .then(() => console.log("Database connected successfully."))
    .catch((error) => console.log("Error occured while connecting db.", error));
}
module.exports = {connectToDb};