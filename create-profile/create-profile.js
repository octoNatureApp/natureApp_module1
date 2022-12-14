// imports

import { getProfile, getUser, uploadImage, upsertProfile } from '../fetch-utils.js';
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';

// get DOM elements
const errorDisplay = document.getElementById('error-display');
const preview = document.getElementById('preview');
const profileForm = document.getElementById('profile-form');
const updateButton = profileForm.querySelector('button');
const userNameInput = profileForm.querySelector('[name=username]');
const avatarInput = profileForm.querySelector('[name=avatar]');
const headlineInput = profileForm.querySelector('[name=headline]');
const signOutLink = document.getElementById('sign-out-link');

// state
let error = null;
let profile = null;

const user = getUser();

// events
// page load event listener
window.addEventListener('load', async () => {
    const response = await getProfile(user.id);
    error = response.error;
    profile = response.data;

    if (error) {
        errorDisplay.textContent = `There was an error: ${error.message}`;
    } else {
        if (profile) {
            userNameInput.value = profile.username;
            if (profile.avatar_url) {
                preview.src = profile.avatar_url;
            }
            if (profile.headline) {
                headlineInput.value = profile.headline;
            }
        }
    }
});

// profile form submit button event listener
profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    updateButton.disabled = true;
    updateButton.textContent = 'Saving...';

    const formData = new FormData(profileForm);

    // get username and headline from form
    const profileObj = {
        username: formData.get('username'),
        headline: formData.get('headline'),
    };

    // get avatar file from form
    const imageFile = formData.get('avatar');

    if (imageFile.size) {
        const imagePath = `${user.id}/${imageFile.name}`;
        const url = await uploadImage(imagePath, imageFile);

        profileObj.avatar_url = url;
    }

    // upsert
    const response = await upsertProfile(profileObj);

    error = response.error;

    if (error) {
        errorDisplay.textContent = `There was an error: ${error.message}`;
        updateButton.disabled = false;
        updateButton.textContent = 'Update Profile';
    } else {
        // STRETCH: send to their profile
        location.assign('/');
    }
});

// avatar preview and update
avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '/assets/avatar.png';
    }
});

// display
