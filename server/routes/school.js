const express = require('express');
const router = express.Router();

router.get('/details', (req, res) => {
  res.json({ name: 'SR Digi School', logo: '/logo.png', account: 'info@srdigi.com' });
});
module.exports = router;
