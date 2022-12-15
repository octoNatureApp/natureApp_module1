// import

import { checkAuth, getProfile, getUser, uploadNaturePic, upsertPost } from '../fetch-utils.js';
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';

// get DOM elements
const errorDisplay = document.getElementById('error-display');
const preview = document.getElementById('preview');
const postForm = document.getElementById('create-post-form');
const updateButton = postForm.querySelector('button');
const natureInput = postForm.querySelector('[name=nature]');
const altTextInput = postForm.querySelector('[name=alt-text]');
const locationInput = postForm.querySelector('[name=location]');
const descriptionInput = postForm.querySelector('[name=description]');
const signOutLink = document.getElementById('sign-out-link');
checkAuth();
// events
let error = null;
let post = null;

const user = getUser();

// page load event listener
// STRETCH: if we want users to edit their post
// window.addEventListener('load', async () => {
//     const response = await getPost(user.id);
//     error = response.error;
//     post = response.data;
// });

// display
// post form submit button event listener

window.addEventListener('load', async () => {
    alertInterval();

});


postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    updateButton.disabled = true;
    updateButton.textContent = 'Posting...';

    const formData = new FormData(postForm);
    const profile = await getProfile(user.id);


    // object: altText, location, description
    const postObj = {
        alt_text: formData.get('alt-text'),
        location: formData.get('location'),
        description: formData.get('description'),
        profile_id: profile.data.id,
    };

    // get image file from form
    const imageFile = formData.get('nature');

    if (imageFile.size) {
        const imagePath = `${user.id}/${imageFile.name}`;
        const url = await uploadNaturePic(imagePath, imageFile);

        postObj.naturepic_url = url;
    }

    // upsert
    const response = await upsertPost(postObj);

    error = response.error;

    if (error) {
        errorDisplay.textContent = `There was an error: ${error.message}`;
        updateButton.disabled = false;
        updateButton.textContent = 'POST';
    } else {
        location.assign(`/profile-feed/?id=${profile.data.id}`);
    }
});

// photo preview and update
natureInput.addEventListener('change', () => {
    const file = natureInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '/assets/nature place holder.png';
    }
});

function alertInterval() {
    const date = new Date();
    if (date.getDay() === 4) {
        alert(('Want to learn more about the original inhabitants of the land you are on. Check out the interactive territory map created by Native Land Canada link'));
    }

}






