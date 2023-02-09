import Twitter from "./Twitter.js";
import GetDataFetch from "./GetDataFetch.js";

const obj = new GetDataFetch();

const twitter = new Twitter({
    listElem: ".tweet-list",
    user: {
        userName: "Maksim",
        nickName: "dedmax",
    },
    modalElements: [
        {
            button: ".header__link_tweet",
            modal: ".modal",
            overlay: ".overlay",
            closeButton: ".modal-close__btn",
        }
    ],
    tweetElems: [
        {
            text: ".modal .tweet-form__text",
            img: ".modal .tweet-img__btn",
            submit: ".modal .tweet-form__btn",
        },
        {
            text: ".tweet-form__text",
            img: ".tweet-img__btn",
            submit: ".tweet-form__btn",
        }
    ],
    classDeleteTweet: "tweet__delete-button",
    classLikeTweet: {
        like: "tweet__like",
        active: "tweet__like_active"
    },
    sortElem: ".header__link_sort",
    showUserPostElem: ".header__link_profile",
    showLikedPostElem: ".header__link_likes",
})