import '../auth/user.js';
import { getProfile } from '../fetch-utils.js';



// profile avatar image
const avatarImgEl = document.querySelector('#avatar-img');
// username of clicked profile
const usernameHeaderEl = document.querySelector('.username-header');
// headline of clicked profile
const headlineHeaderEl = document.querySelector('.headline-header');
// Card image from create post
const postCardImgEl = document.querySelector('.post-card-img');
// Messages for posts 
const messageFeedEl = document.querySelector('Messages-for-post');
// creating likes on profile instead of posts 
// const profileLikesEl = document.querySelector('.profile-likes');

// location of post img
const postLocationEl = document.querySelector('.post-location');
//  description of post img
const postDescriptionEl = document.querySelector('.post-description');
// distinguish between usernames when someone sends message
const senderUsernameEl = document.querySelector('.username');
// how and where people send messages
const MessageForm = document.querySelector('.Message-form');

const params = new URLSearchParams(location.search);
const id = params.get('id');
const user = getUser();


window.addEventListener('load', async () => {
    // error handling
    if (!id) {
        // no id found, redirect back to room list
        location.assign('/');
        // don't run the rest of the cod in function
        return;
    }
    DisplayProfile();
});

// onmessage(id, async (payload) => {
//     displayProfile();
// });

// MessageForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const data = new FormData(MessageForm);
//     // do we need to create a getProfileByUser to distinguish between sender and recipient?
//     const senderProfile = await getProfile(user.id);

//     if (!senderProfile) {
//         alert('Make a profile before Messageing!');
//         location.assign('/');
//     } else {
//         await createMessage({
//             text: data.get('messages'),
//             sender: senderProfile.data.username,
//             recipient_id: id,
//             user_id: user.id,
//             sender_avatar: senderProfile.data.avatar_url,
//         });
//         messageForm.reset();
//     }
// });
