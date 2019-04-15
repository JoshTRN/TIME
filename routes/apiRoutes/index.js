const router = require('express').Router();
const db = require('../../models')

router.get('/test', (req, res) => res.send('route hit')),

module.exports = router