const Timetable = require("../models/Timetable");

exports.getAll = async (req, res) => {
  const data = await Timetable.find();
  res.json(data);
};

exports.create = async (req, res) => {
  const created = await Timetable.create(req.body);
  res.status(201).json(created);
};
