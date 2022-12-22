import { deletePost, getPosts } from './fetch-utils.js';
import { displayPosts } from './profile-feed/profile-feed.js';

// render profile on home page
export function renderProfile(profile) {
    // container and elements and link
    const a = document.createElement('a');
    // post photo
    const img = document.createElement('img');
    // avatar
    const img2 = document.createElement('img');
    // username
    const p = document.createElement('p');

    // class lists
    a.classList.add('profile-container');
    img.classList.add('polaroid');
    img2.classList.add('avatar');
    p.classList.add('username');

    // images
    // polaroid photo
    // img.src = profile.naturepic_url;
    // leave blank so it is replaced with user submitted alt text
    img.alt = '';
    // avatar
    img2.src = profile.avatar_url;
    img2.alt = 'avatar';

    // text content
    p.textContent = `${profile.username}`;
    a.href = `../profile-feed/?id=${profile.id}`;

    // append
    a.append(img2, p);

    // return
    return a;
}

let hover = null;
const hoverNavEl = 


export function renderPost(postObject, profile) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const p1 = document.createElement('p');
    const div2 = document.createElement('div');
    const deleteButton = document.createElement('button');
    if (postObject.profile_id === profile.data.id) {
        deleteButton.classList.add('delete-button');
    } else {
        deleteButton.style.display = 'none';
    }

    div.classList.add('post-list');
    img.classList.add('naturepic');
    div2.classList.add('info-card');
    h2.classList.add('location');
    p1.classList.add('description');

    img.src = postObject.naturepic_url;
    img.alt = '';
    h2.textContent = postObject.location;
    p1.textContent = postObject.description;
    deleteButton.textContent = 'Delete Post';

    // delete post event listener
    deleteButton.addEventListener('click', async () => {
        // deletePosts by post id
        await deletePost(postObject.id);

        // update posts by profile_id
        const updatedPosts = await getPosts(postObject.profile_id);

        if (confirm('Click Ok to delete post. This action cannot be done')) {
            // display updated posts
            displayPosts(updatedPosts);
        } else {
            location.assign(`/profile-feed/?id=${profile.profile_id}`);
        }
    });

    div2.prepend(h2, p1);
    div.append(img, div2, deleteButton);
    return div;
}

export function mouseOver() {
    const editProfileIcon = document.querySelector('.edit-profile-icon');
    const postIcon = document.querySelector('.post-icon');
    const signOutIcon = document.querySelector('#sign-out-link');
    const homeIcon = document.querySelector('.home-icon');
    const nativeLand = document.querySelector('#native-land');
    const myProfile = document.querySelector('.my-profile');
    const team = document.querySelector('#team');
    const location = document.querySelector('.location');


    editProfileIcon.textContent = 'Edit-Profile';
    postIcon.textContent = 'Create Post';
    signOutIcon.textContent = 'Sign-Out';
    homeIcon.textContent = 'Return to Homepage';
    nativeLand.textContent = 'Learn more about the indigenous communities and land through this interactive website!';
    myProfile.textContent = 'My Profile';
    team.textContent = 'Meet the Team!';
    location.textContent = 'Add the name of the indigenous community or communities who inhabited and continue to inhabit the areas from the images you are sharing and exploring';








}