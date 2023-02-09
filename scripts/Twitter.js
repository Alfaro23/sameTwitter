import GetDataFetch from "./GetDataFetch.js";
import Posts from "./Posts.js";

class Twitter{
    constructor({ user, listElem, modalElements, tweetElems, classDeleteTweet, classLikeTweet, sortElem, showUserPostElem, showLikedPostElem }){

        const getDataFetch = new GetDataFetch();
        this.tweets = new Posts();

        this.user = user;

        this.elements = {
            listElem: document.querySelector(listElem),
            modal: modalElements,
            tweetElems: tweetElems,
            sortElem: document.querySelector(sortElem),
            showUserPostElem: document.querySelector(showUserPostElem),
            showLikedPostElem: document.querySelector(showLikedPostElem),
        }

        this.class = {
            classDeleteTweet: classDeleteTweet,
            classLikeTweet: classLikeTweet,
        }

        this.sortDate = true

        getDataFetch.getPosts().then(data => {
            data.forEach(this.tweets.addPost);
            this.showAllPost()
        })

        this.elements.modal.forEach(this.handlerModal.bind(this))
        this.elements.tweetElems.forEach(this.addTweet.bind(this))

        this.elements.listElem.addEventListener("click", this.handlerTweet);
        this.elements.sortElem.addEventListener("click", this.changeSortView);

        this.elements.showLikedPostElem.addEventListener("click", this.showLikesPost);
        this.elements.showUserPostElem.addEventListener("click", this.showUserPost);
    }

    renderPosts(tweets){

        const sortPost = tweets.sort(this.sortFields());
        this.elements.listElem.textContent = "";

        sortPost.forEach(({id, userName, nickName, datePost, text, photo, likes, liked, getDate}) => {
            
            this.elements.listElem.insertAdjacentHTML("beforeend", `
            
                <li>
                    <article class="tweet">
                        <div class="row">
                            <img class="avatar" src="images/${nickName}.jpg" alt="Аватар пользователя ${nickName}">
                            <div class="tweet__wrapper">
                                <header class="tweet__header">
                                    <h3 class="tweet-author">${userName}
                                        <span class="tweet-author__add tweet-author__nickname">@${nickName}</span>
                                        <time class="tweet-author__add tweet__date">${getDate()}</time>
                                    </h3>
                                    <button class="tweet__delete-button chest-icon" data-id="${id}"></button>
                                </header>
                                <div class="tweet-post">
                                    <p class="tweet-post__text">${text}</p>
                                    ${photo ? 
                                        `<figure class="tweet-post__image">
                                            <img src="${photo}" alt="Фото ${userName}">
                                        </figure>` : ""}
                                </div>
                            </div>
                        </div>
                        <footer>
                            <button class="tweet__like ${liked ? this.class.classLikeTweet.active : ""}" data-id="${id}">
                                ${likes}
                            </button>
                        </footer>
                    </article>
                </li>
            `)
        })
    }

    showUserPost = () => {
        const post = this.tweets.posts.filter(item => item.nickName === this.user.nickName);
        this.renderPosts(post);
    }

    showLikesPost = () => {
        const post = this.tweets.posts.filter(item => item.liked);
        this.renderPosts(post);
    }

    handlerModal({button, modal, overlay, closeButton}){

        const buttonElem = document.querySelector(button);
        const modalElem = document.querySelector(modal);
        const overlayElem = document.querySelector(overlay);
        const closeButtonElem = document.querySelector(closeButton);

        const openModal = () => {
            modalElem.style.display = "block";
        }

        const closeModal = (elem, e) => {
            const target = e.target;

            if(target === elem){
                modalElem.style.display = "none";
            }
        }

        buttonElem.addEventListener("click", openModal);

        if(closeButtonElem) closeButtonElem.addEventListener("click", closeModal.bind(null, closeButtonElem));


        if(overlayElem) overlayElem.addEventListener("click", closeModal.bind(null, overlayElem));
        
        this.handlerModal.closeModal = () => {
            modalElem.style.display = "none";
        }
    }

    addTweet({text, img, submit}){
        const textElem = document.querySelector(text);
        const imgElem = document.querySelector(img);
        const submitElem = document.querySelector(submit);
        let imgURL = ""
        let tempString = textElem.innerHTML;

        submitElem.addEventListener("click", () => {
            this.tweets.addPost({
                userName: this.user.userName,
                nickName: this.user.nickName,
                text: textElem.innerHTML,
                photo: imgURL
            })
            this.showAllPost();
            this.handlerModal.closeModal();
            textElem.innerHTML = tempString;
        })

        textElem.addEventListener("click", () => {
            if(textElem.innerHTML === tempString) textElem.innerHTML = ""
        })

        imgElem.addEventListener("click", () => {
            imgURL = prompt("Enter your img url");
            console.log(imgURL)
        })

        console.log(imgURL)
    }

    showAllPost(){
        this.renderPosts(this.tweets.posts)
    }

    handlerTweet = (e) => {
        const target = e.target
        if(target.classList.contains(this.class.classDeleteTweet)){
            this.tweets.deletePost(target.dataset.id);
            this.showAllPost();
        }
        if(target.classList.contains(this.class.classLikeTweet.like)){
            console.log(target.dataset.id)
            this.tweets.likePost(target.dataset.id);
            this.showAllPost();
        }
    }

    changeSortView = () => {
        this.sortDate = !this.sortDate;
        this.showAllPost()
    }

    sortFields = () => {
        if(this.sortDate){
            return (a, b) => {
                const dateA = new Date(a.postDate);
                const dateB = new Date(b.postDate);

                return dateB - dateA;
            }
        } else {
            return (a, b) => b.likes - a.likes 
        }
    }
}


export default Twitter