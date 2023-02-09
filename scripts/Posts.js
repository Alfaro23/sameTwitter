import Post from "./Post.js";

class Posts{
    constructor({ posts = [] } = {}){
        this.posts = posts;
    }

    addPost = (tweet) => {
        const post = new Post(tweet)
        this.posts.unshift(post)
    }
    deletePost(id){
        this.posts = this.posts.filter(item => item.id !== id)
    }

    likePost(id){
        this.posts.forEach(item => {
            if(item.id === id){
                // console.log(item)
                item.changeLike();
            }
        })
    }
}

export default Posts