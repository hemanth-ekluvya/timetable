const express = require('express');
const router = express.Router();
const PaperSetter = require('../models/PaperSetter');

router.get('/', async (req, res) => {
  const setters = await PaperSetter.find();
  res.json(setters);
});

router.get('/:id', async (req, res) => {
  const setter = await PaperSetter.findById(req.params.id);
  res.json(setter);
});
module.exports = router;