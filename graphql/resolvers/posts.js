const Post = require('../../models/Post');
const chechAuth = require('../../util/check-auth');
const { Mutation } = require('./users');

module.exports = {
    Query: {
        async getPosts(){
          try{
              const posts = await Post.find().sort({createdAt: -1});
              return posts;
          }catch(err){
              throw new Error(err);
          }
        },
        async getPost(){
            try{
                const post = await Post.findById(postId)
                if(post){
                    return post;
                } else {
                    throw new Error('Post not found')
                }
            } catch(err){
                throw new Error(err);
            }
        }
    },
    Mutation:{
        async createPost(_, {body}, context){
            const user = chechAuth(context);
            console.log(user);

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
        const post = await newPost.save();

        return post;
        }
    }
};