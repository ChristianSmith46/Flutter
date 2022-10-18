const router = require('express').Router();
const blogpostRoutes = require('./blogpostRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/blogpost', blogpostRoutes);

module.exports = router;