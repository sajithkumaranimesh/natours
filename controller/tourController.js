const Tour = require("../models/tourModel");

exports.aliasTopTours = (req, res, next) =>{
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage.price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}


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


    // 3) Field limiting
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields);
    }else{
      query = query.select('-__v');
    }


    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    //page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3
    query = query.skip(skip).limit(limit);

    if(req.query.page){
      const numTours = await Tour.countDocuments();
      if(skip >= numTours) throw new Error('This page dose not exist')
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
