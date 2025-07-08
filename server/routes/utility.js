const express = require('express');
const router = express.Router();

router.get('/courses', (req, res) => {
  res.json(['IIT', 'CBSE']);
});

router.get('/classes', (req, res) => {
  res.json({ IIT: ['11A', '11B'], CBSE: ['10A', '10B'] });
});
module.exports = router;