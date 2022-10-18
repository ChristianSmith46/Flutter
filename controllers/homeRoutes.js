const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: [ 'username']
                }
            ],
            order: [["id", "DESC"]]
        });
        const posts = allPosts.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            logged_in: req.session.logged_in,
            posts
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

router.get('/profile', withAuth, async (req, res) => {
    res.render('profile', {
        logged_in: req.session.logged_in
    });
});

module.exports = router;