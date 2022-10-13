const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});
//this is a thing

module.exports = router;