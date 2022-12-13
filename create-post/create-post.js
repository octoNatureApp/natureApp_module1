// import

import { getUser, uploadNaturePic, upsertPost } from '../fetch-utils.js';

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

// events
let error = null;
let post = null;

const user = getUser();

console.log('postForm', postForm);

// display
// post form submit button event listener
postForm.addEventListener('submit', async (e) => {
    console.log('hello!');
    e.preventDefault();

    updateButton.disabled = true;
    updateButton.textContent = 'Posting...';

    const formData = new FormData(postForm);
    console.log('formData', formData);

    // object: altText, location, description
    const postObj = {
        alt_text: formData.get('alt-text'),
        location: formData.get('location'),
        description: formData.get('description'),
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
    console.log('response', response);

    error = response.error;

    if (error) {
        errorDisplay.textContent = `There was an error: ${error.message}`;
        updateButton.disabled = false;
        updateButton.textContent = 'POST';
    } else {
        location.assign('/profile-feed');
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
