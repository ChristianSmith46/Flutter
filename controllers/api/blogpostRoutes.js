const router = require('express').Router();
const { BlogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.create({
            ...req.body,
            author_id: req.session.user_id
        });
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const allPosts = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: [ 'username']
                }
            ],
        });
        console.log(allPosts);
        res.json(allPosts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;