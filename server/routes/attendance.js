const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const mongoose = require('mongoose');

router.get('/teachers', async (req, res) => {
  const { week, month, course } = req.query;
  const query = { course };
  if (month) {
    const start = new Date(month);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    query.date = { $gte: start, $lt: end };
  }
  const attendance = await Attendance.find(query).populate('teacherId', 'name');
  res.json(attendance);
});

router.get('/teacher/:id', async (req, res) => {
  const id = req.params.id;
  const teacherAttendance = await Attendance.find({ teacherId: id });
  res.json(teacherAttendance);
});

module.exports = router;