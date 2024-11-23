const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then((con) => {
  console.log("DB connection successfuly!");
});

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "test tour 1",
  rating: 5.0,
  price: 100,
});

testTour.save().then((doc) => {
  console.log(doc);
}).catch(err => {
  console.log("Err : ", err);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
