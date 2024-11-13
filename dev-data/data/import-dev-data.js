const fs = require('fs');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Tour = require('../../models/tourModel');


dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("Database Connected!!"));


  //READE THE JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));


 //IMPORT DATA INTO DATABASE
const importData = async () => {
    try{
        await Tour.create(tours);
        console.log("Data successfullt loaded!");
    }catch(err){
        console.log(err);
    }
    process.exit();
}

  //DELETE ALL DATA FROM DATABASE
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData()
}
console.log(process.argv)