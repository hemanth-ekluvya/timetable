const LessonPlan = require("../models/LessonPlan");

exports.getAll = async (req, res) => {
  const data = await LessonPlan.find();
  res.json(data);
};

exports.create = async (req, res) => {
  const created = await LessonPlan.create(req.body);
  res.status(201).json(created);
};
