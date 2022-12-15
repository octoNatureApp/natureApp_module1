import '../auth/user.js';
import { getUser, getPosts, getProfileById, getProfile } from '../fetch-utils.js';
import { renderPost } from '../render-utils.js';

const postSectionsEl = document.querySelector('.posts-section');
const profileInfoEl = document.querySelector('.profile-info-section');
const avatarImgEl = document.querySelector('#avatar-img');
const usernameHeaderEl = document.querySelector('.username-header');
const headlineHeaderEl = document.querySelector('.headline-header');

const messageFeedEl = document.querySelector('Messages-for-post');
const params = new URLSearchParams(location.search);
const id = params.get('id');
const user = getUser();

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
    const likes = await getProfile(user.id);
    console.log('likes', likes);
    avatarImgEl.src = profile.avatar_url;
    usernameHeaderEl.textContent = profile.username;
    headlineHeaderEl.textContent = profile.headline;

    const profileLikes = renderLikes(profile.id);
    headlineHeaderEl.append(profileLikes);
    console.log(profileLikes);
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

function renderLikes(likes) {
    const likeButton = document.createElement('button');
    const profileLikes = document.createElement('div');
    const p = document.createElement('p');

    profileLikes.classList.add('profile-Likes');
    likeButton.textContent = `Likes ${likes}🍃`;


    profileLikes.append(p, likeButton);

    likeButton.addEventListener('click', async () => {

        await profileLikes(id);
        await displayProfile();
    });

    return profileLikes;
}