const PaperSetter = require("../models/PaperSetter");

exports.getAll = async (req, res) => {
  const data = await PaperSetter.find();
  res.json(data);
};

exports.create = async (req, res) => {
  const created = await PaperSetter.create(req.body);
  res.status(201).json(created);
};
