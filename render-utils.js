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

export function renderPost(postObject) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const p1 = document.createElement('p');

    div.classList.add('post-list');
    img.classList.add('naturepic');
    p.classList.add('location');
    p1.classList.add('description');

    img.src = postObject.naturepic_url;
    img.alt = '';
    p.textContent = postObject.location;
    p1.textContent = postObject.description;

    div.append(img, p, p1);
    return div;
}
