const router = require('express').Router();

router.use('/api', require('./apiRoutes'))

module.exports = router;