const router = require('express').Router();
const blogpostRoutes = require('./blogpostRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);

module.exports = router;