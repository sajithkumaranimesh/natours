const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    //build query
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedField = ["page", "sort", "limit", "fields"];
    excludedField.map((el) => delete queryObj[el]);

    // 1B) advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));


    let query = Tour.find(JSON.parse(queryStr));

    // 2) sorting
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
      // sort('price ratingsAverage)
    }else{
      query = query.sort('-createdAt');
    }

    //Exicute query
    const tours = await query;

    // const query = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");

    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: "Invalid data send",
    });
  }
};

exports.getTours = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: "Invalid data send",
    });
  }
};

exports.createTours = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.updateTours = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: "Invalid data send",
    });
  }
};

exports.deleteTours = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: "Invalid data send",
    });
  }
};
