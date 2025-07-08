const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

router.get('/class/:class_id', async (req, res) => {
  const { date, section } = req.query;
  const timetable = await Timetable.find({ classId: req.params.class_id, section, date });
  res.json(timetable);
});

router.get('/day', async (req, res) => {
  const date = new Date().toISOString().split('T')[0];
  const timetable = await Timetable.find({ date });
  res.json(timetable);
});

router.get('/all', async (req, res) => {
  const timetable = await Timetable.find();
  res.json(timetable);
});

router.get('/syllabus/:class_id', async (req, res) => {
  // Dummy response
  res.json({ classId: req.params.class_id, syllabus: 'Math, Science, English' });
});
module.exports = router;