const router = require('express').Router();
const tasks = require('./tasks');
const { validator } = require('../../middleware');

router.use('/tasks', validator, tasks);

module.exports = router