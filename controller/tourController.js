const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`Tour ID is : ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
}

exports.checkBody = (req, res, next) => {
  if(!req.body.name || !req.body.price){
    return res.status(400).json({
      status: "faild",
      message: "Missing name or price"
    })
  }
  next();
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTours = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tour,
    },
  });
};

exports.createTours = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        tours: newTour,
      });
    }
  );
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
