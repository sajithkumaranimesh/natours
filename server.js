const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("Database Connected!!"));




app.listen(port, () => {
  console.log(`Express app listen on port ${port}...`);
});
