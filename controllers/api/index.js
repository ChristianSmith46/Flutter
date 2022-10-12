const router = require('express').Router();
const blogpostRoutes = require('./blogpostRoutesblogpostRoutes');
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);
router.use('/blogpost', blogpostRoutes);

module.exports = router;