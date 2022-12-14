import '../auth/user.js';
import { getUser, getPosts, getProfileById, deletePost } from '../fetch-utils.js';
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

//display function

async function displayProfile() {
    const profile = await getProfileById(id);
    avatarImgEl.src = profile.avatar_url;
    usernameHeaderEl.textContent = profile.username;
    headlineHeaderEl.textContent = profile.headline;
}

async function displayPosts() {
    postSectionsEl.textContent = '';
    const posts = await getPosts(id);

    for (let post of posts) {
        const postEl = renderPost(post);
        // delete post button
        // const deleteButton = await deletePost(id);
        // postEl.append(deleteButton);
        postSectionsEl.append(postEl);
    }
}
