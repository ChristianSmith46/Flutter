const User = require('./User');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
    foreignKey: 'author_id',
    ondDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'author_id'
});

module.exports = {User, BlogPost};