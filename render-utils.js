import { deletePost, getPosts } from './fetch-utils.js';
import { displayPosts } from './profile-feed/profile-feed.js';

let index = 0;

// render profile on home page
export function renderProfile(profile) {


    const li = document.createElement('li');


    // container and elements and link
    const a = document.createElement('a');
    // post photo
    const img = document.createElement('img');
    // avatar
    const img2 = document.createElement('img');
    // username
    const p = document.createElement('p');
    const h2 = document.createElement('h2');

    // class lists



    a.classList.add('profile-container');
    img.classList.add('polaroid');
    img2.classList.add('avatar');
    h2.classList.add('username');
    p.classList.add('headline');



    img.alt = '';
    // avatar
    img2.src = profile.avatar_url;
    img2.alt = 'avatar';

    // text content
    h2.textContent = `${profile.username}`;
    p.textContent = `${profile.headline}`;
    a.href = `../profile-feed/?id=${profile.id}`;



    // append

    a.prepend(img2, h2, p);

    li.append(a);



    // return
    return li;
}

export function renderPost(postObject, profile) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const p1 = document.createElement('p');
    const div2 = document.createElement('div');

    const deleteButton = document.createElement('button');
    if (postObject.profile_id === profile.data.id) {
        deleteButton.classList.add('delete-button');
    } else {
        deleteButton.style.display = 'none';
    }

    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    const buttons = document.createElement('button');

    buttons.classList.add('gallery-buttons');

    prevButton.textContent = 'Prev <';
    nextButton.textContent = ' Next >';
    buttons.textContent = '';

    buttons.prepend(prevButton, nextButton);






    div.classList.add('post-list');
    img.classList.add('naturepic');
    p.classList.add('location');
    p1.classList.add('description');
    div2.classList.add('info-card');

    img.src = postObject.naturepic_url;
    img.alt = '';
    p.textContent = postObject.location;
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


    nextButton.addEventListener('click', async () => {
        index = (index === postObject.length - 1) ? 0 : index + 1;


    });

    prevButton.addEventListener('click', async () => {
        index = (index === 0) ? postObject.length - 1 : index - 1;

    });



    div2.prepend(p, p1, buttons);
    div.append(img, div2, deleteButton);
    return div;
}









