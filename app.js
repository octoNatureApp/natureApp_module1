/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { checkAuth, getProfile, getProfiles, getUser, searchByUsername } from './fetch-utils.js';

import { renderProfile } from './render-utils.js';

/* Get DOM Elements */
const containerEl = document.getElementById('profiles-container');
const profileFeed = document.querySelector('#profile-feed-link');
const form = document.getElementById('search-name-form');
checkAuth();
/* State */
let username = [];
// go to user table and get the user
const user = getUser();
/* Events */
window.addEventListener('load', async () => {
    const id = await getProfile(user.id);
    if (!id.data) {
        alert('Welcome! You are being redirected to the create your profile');
        location.replace('./create-profile');
    } else {
        profileFeed.href = `../profile-feed/?id=${id.data.id}`;
        const profile = await getProfiles();
        displayProfiles(profile);
    }
});

/* Display Functions */
async function displayProfiles(profiles) {
    containerEl.textContent = '';

    for (let profile of profiles) {
        const profileEl = renderProfile(profile);
        containerEl.append(profileEl);
    }
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchForm = new FormData(form);
    const profiles = await searchByUsername(searchForm.get('search-input'));
    displayProfiles(profiles.data);
});

// profileFeed.addEventListener('click', async () => {
//     const id = await getProfile(user.id);
//     window.location.assign(`../profile-feed/?id=${id.data.id}`);
// });
