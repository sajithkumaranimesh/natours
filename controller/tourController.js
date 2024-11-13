const Tour = require('../models/tourModel');


exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: "success",
  //   requestedAt: req.requestTime,
  //   result: tours.length,
  //   data: {
  //     tours: tours,
  //   },
  // });
};

exports.getTours = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: "success",
  //   result: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTours = async (req, res) => {
  try{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data:{
        tour: newTour
      }
    });
  }catch(err){
    res.status(400).json({
      status: "Faild",
      message: "Invalid data send"
    })
  }
};

exports.updateTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "updatin tours hire",
    },
  });
};

exports.deleteTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
};
