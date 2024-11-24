const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then((con) => {
  console.log("DB connection successfuly!");
});

//READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data successfully imported");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//DELETE DATA INTO DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//
if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}
