const router = require('express').Router();

router.use(require('./apiRoutes'));
router.use(require('./home'))

module.exports = router;