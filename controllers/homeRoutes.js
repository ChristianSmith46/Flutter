const { BlogPost } = require('../models');
const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = BlogPost.findAll();
        console.log(blogData);
        res.render('homepage');
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;