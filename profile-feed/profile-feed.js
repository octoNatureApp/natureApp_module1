import '../auth/user.js';
import { getUser, getPosts, getProfileById, getProfile, checkAuth, profileLikes } from '../fetch-utils.js';
import { renderPost } from '../render-utils.js';

const postSectionsEl = document.getElementById('posts-container');
const avatarImgEl = document.querySelector('#avatar-img');
const usernameHeaderEl = document.querySelector('.username-header');
const headlineHeaderEl = document.querySelector('.headline-header');
const profileLikesEl = document.querySelector('#profile-likes');

const messageFeedEl = document.querySelector('Messages-for-post');
const params = new URLSearchParams(location.search);
const id = params.get('id');
const user = getUser();

let index = 0;
checkAuth();
window.addEventListener('load', async () => {
    // error handling
    if (!id) {
        // no id found, redirect back to room list
        // location.assign('/');
        // don't run the rest of the cod in function
        return;
    }
    displayProfile();
    displayPosts();

});

async function displayProfile() {
    const profile = await getProfileById(id);

    avatarImgEl.src = profile.avatar_url;
    usernameHeaderEl.textContent = profile.username;
    headlineHeaderEl.textContent = profile.headline;
    profileLikesEl.textContent = '';

    const buttonLikes = renderLikes(profile);
    profileLikesEl.append(buttonLikes);



}

export async function displayPosts() {
    postSectionsEl.textContent = '';
    const posts = await getPosts(id);
    const profile = await getProfile(user.id);
    for (let post of posts) {
        const postEl = renderPost(post, profile);
        postSectionsEl.append(postEl);
    }
}



function renderLikes({ likes, id }) {
    const likeButton = document.createElement('button');
    const div = document.createElement('div');


    div.classList.add('profile-likes');
    likeButton.classList.add('like-button');
    likeButton.textContent = `Likes ${likes}🍃`;

    div.append(likeButton);



    likeButton.addEventListener('click', async () => {
        await profileLikes(id);
        await displayProfile();
    });

    return div;
}

export function renderImageNav(nextPost, prevPost) {
    const postLength = document.getElementsByClassName('post-list')[0];
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    const buttons = document.createElement('div');

    buttons.classList.add('gallery-buttons');

    prevButton.textContent = 'Prev ⬅️';
    nextButton.textContent = ' ➡️Next ';
    buttons.textContent = '';

    buttons.append(prevButton, nextButton);



    nextButton.addEventListener('click', async () => {
        const nextPost = [];
        if (index < postLength - 1) {
            index++;
            postLength[index];
        }
        return nextPost(postLength[index]);
    });

    prevButton.addEventListener('click', async () => {
        const prevPost = [];
        if (index > 0) {
            index--;
            postLength[index];
        }
        return prevPost(postLength[index]);
    });
    return buttons;
}


