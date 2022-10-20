const { json } = require('express');
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
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: ['username'],
            include: [{
                model: BlogPost
            }],
            order: [
                [{ model: BlogPost}, 'id', 'DESC']
            ]
        });
        const finalUserData = userData.get({ plain: true });
        res.render('profile', {
            logged_in: req.session.logged_in,
            isAuthor: true,
            finalUserData
        });
    } catch (err) {
        res.json(err);
    }
});

router.get('/user/:username', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.params.username
            },
            attributes: ['username', 'id'],
            include: [{
                model: BlogPost
            }],
            order: [
                [{ model: BlogPost}, 'id', 'DESC']
            ]
        });
        if (userData === null) {
            res.render('404', {
                logged_in: req.session.logged_in
            });
            return;
        }
        const finalUserData = userData.get({ plain: true });
        const isAuthor = finalUserData.id === req.session.user_id;
        res.render('profile', {
            logged_in: req.session.logged_in,
            isAuthor,
            finalUserData
        });
    } catch (err){
        res.json(err);
    }
});

router.get('/*', withAuth, () => {
    res.render('404', {
        logged_in: req.session.logged_in
    });
});

module.exports = router;