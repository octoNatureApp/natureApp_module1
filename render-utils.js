// render profile on home page
export function renderProfile(profile) {
    // container and elements
    const div = document.createElement('div');
    // post photo
    const img = document.createElement('img');
    // avatar
    const img2 = document.createElement('img');
    // username
    const p = document.createElement('p');

    // class lists
    div.classList.add('profile-container');
    img.classList.add('polaroid');
    img2.classList.add('avatar');
    p.classList.add('username');

    // images
    // polaroid photo
    img.src = profile.naturepic_url;
    img.alt = 'user submitted photo';
    // avatar
    img2.src = profile.avatar_url;
    img2.alt = 'avatar';

    // text content
    p.textContent = `${profile.username}`;

    // append
    div.append(img, img2, p);

    // return
    return div;
}
