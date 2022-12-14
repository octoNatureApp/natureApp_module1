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

export function renderPost(postObject, profile) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const p1 = document.createElement('p');
    const deleteButton = document.createElement('button');

    div.classList.add('post-list');
    img.classList.add('naturepic');
    p.classList.add('location');
    p1.classList.add('description');
    deleteButton.classList.add('delete-button');

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
        } else { location.assign(`/profile-feed/?id=${profile.profile_id}`); }


    });

    div.append(img, p, p1, deleteButton);
    return div;
}

export async function renderMessages(profile) {
    const ul = document.createElement('ul');

    ul.classList.add('messages');

    for (let i = 0; i < profile.messages.length; i++) {
        console.log(profile, 'profile');
        // for (let i = profile.messages.length -1; i > -1; i--)
        // console.log('i', profile.messages[i]);
        const li = document.createElement('p');
        li.classList.add('message');

        const div = document.createElement('div');
        div.classList.add('message-info');

        const img = document.createElement('img');
        img.classList.add('avatar-thumbnail');
        // img.src = profile.messages[i].sender;
        // img.alt = 'avatar';

        // console.log(sender.data.avatar_url);

        if (profile.messages[i].sender_avatar) {
            img.src = profile.messages[i].sender_avatar;
        } else {
            img.src = '/assets/avatar.png';
        }
        img.alt = 'avatar';

        const senderSpan = document.createElement('span');
        senderSpan.classList.add('from');
        senderSpan.textContent = `${profile.messages[i].sender} - `;

        const dateSpan = document.createElement('span');
        dateSpan.classList.add('created-date');
        dateSpan.textContent = new Date(profile.messages[i].created_at).toLocaleString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });

        const text = document.createElement('p');
        text.classList.add('text');
        text.textContent = profile.messages[i].text;

        div.append(img, senderSpan, dateSpan);

        li.append(div, text);

        ul.append(li);
    }

    return ul;
}



