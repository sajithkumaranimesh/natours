const Tour = require("../models/tourModel.js");

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price'
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  console.log(req.requestTime);
  console.log(req.query);

  try {
    // 1) writing another way
    // const tours = await Tour.find({
    //   duration: "5",
    //   difficulty: "easy",
    // });

    // 2) writing another way
    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");

    // exclude the field
    // build query
    // 1) filtering
    const queryObj = {...req.query};
    const excludeFields = ['page','sort','limit','fields']
    excludeFields.forEach(el => delete queryObj[el]);

    // 2) advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    console.log(req.query, queryObj);

    const query = Tour.find(JSON.parse(queryStr));

    const tours = await query;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILD",
      messag: "Invalid data send!",
    });
  }
};

exports.getTour = async (req, res) => {
  console.log(req.params.id);

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
      status: "FAILD",
      messag: "Invalid data send!",
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILD",
      messag: "Invalid data send!",
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILD",
      messag: "Invalid data send!",
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILD",
      messag: "Invalid data send!",
    });
  }
};
