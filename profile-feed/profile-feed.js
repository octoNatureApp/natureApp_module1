import '../auth/user.js';
import { getProfile } from '../fetch-utils.js';
// fetch utils here


const avatarImgEl = document.querySelector('#avatar-img');
const usernameHeaderEl = document.querySelector('.username-header');
const headlineHeaderEl = document.querySelector('.headline-header');
const postCardImgEl = document.querySelector('.post-card-img');
const commentFeedEl = document.querySelector('comments-for-post');
const profileLikesEl = document.querySelector('.profile-likes');
const postLocationEl = document.querySelector('.post-location');
const postDescriptionEl = document.querySelector('.post-description');
const senderUsernameEl = document.querySelector('.username');
const commentForm = document.querySelector('.comment-form');

const params = new URLSearchParams(location.search);
const id = params.get('id');
const user = getUser();

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(commentForm);
    // do we need to create a getProfileByUser to distinguish between sender and recipient?
    const senderProfile = await getProfile(user.id);

    if (!senderProfile) {
        alert('Make a profile before commenting!');
        location.assign('/');
    } else {
        await createComment({
            text: data.get('message')
        })
    }
})
