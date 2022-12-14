/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
<<<<<<< HEAD
import { getProfile, getProfileById, getProfiles, getUser, redirectIfNoProfile } from './fetch-utils.js';
=======
import { getProfile, getProfiles, getUser } from './fetch-utils.js';
>>>>>>> 1b1023603208deeee926bd0c1849d0c71ba83533
import { renderProfile } from './render-utils.js';

/* Get DOM Elements */
const containerEl = document.getElementById('profiles-container');
const profileFeed = document.querySelector('#profile-feed-link');

/* State */
// go to user table and get the user
const user = getUser();
/* Events */

window.addEventListener('load', async () => {
<<<<<<< HEAD
    const id = getProfileById(user.id);
    redirectIfNoProfile(id.id);
=======
    const id = await getProfile(user.id);
    profileFeed.href = `../profile-feed/?id=${id.data.id}`;
>>>>>>> 1b1023603208deeee926bd0c1849d0c71ba83533
    displayProfiles();
});

window.addEventListener('load', async () => {
    redirectIfNoProfile(user);
});


/* Display Functions */
async function displayProfiles() {
    containerEl.textContent = '';

    const profiles = await getProfiles();


    for (let profile of profiles) {
        const profileEl = renderProfile(profile);
        containerEl.append(profileEl);
    }
}

// profileFeed.addEventListener('click', async () => {
//     const id = await getProfile(user.id);
//     window.location.assign(`../profile-feed/?id=${id.data.id}`);
// });
