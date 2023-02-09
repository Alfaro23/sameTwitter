class Post{
    constructor({id, userName, nickName, dataPost, text, photo, likes = 0}){
        this.id = id ? id : this.generateID();
        this.userName = userName;
        this.nickName = nickName;
        this.datePost = dataPost ? this.correctDate(dataPost) : new Date();
        this.text = text;
        this.photo = photo;
        this.likes = likes;
        this.liked = false;
    }

    changeLike(){
        console.log(1)
        this.liked = !this.liked;

        if(this.liked){
            this.likes++;
        }else{
            this.likes--;
        }
    }

    generateID(){
        return Math.random().toString(32).substring(2, 9) + (+new Date).toString(32);
    }

    getDate = () => {

        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minutes: "2-digit",
        };

        return this.datePost.toLocaleString("en-US", options)
    }

    correctDate(date){
        if(isNaN(Date.parse(date))) date = date.replace( /\./g, "/");
                                            //date.replaceAll( ".", "/");
        return new Date(date)
    }
}

export default Post