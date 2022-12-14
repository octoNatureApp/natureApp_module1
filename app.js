/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getProfiles, getUser } from './fetch-utils.js';
import { renderProfile } from './render-utils.js';

/* Get DOM Elements */
const containerEl = document.getElementById('profiles-container');
const profileFeed = document.querySelector('[href="./profile-feed]');
/* State */
const user = getUser();
/* Events */
window.addEventListener('load', async () => {
    displayProfiles();
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

profileFeed.addEventListener('click', async () => {
    profileFeed.href = `/profile-feed/?id=${user.id}`;
});
