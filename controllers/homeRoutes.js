const { BlogPost } = require('../models');
const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {
    try {
        req.session.loggedIn;
        const blogData = await BlogPost.findAll();
        console.log(blogData);
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.json(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login', {
        logged_in: false
    });
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

module.exports = router;