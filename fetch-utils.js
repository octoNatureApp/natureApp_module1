const SUPABASE_URL = 'https://fypohquqpythfovrkjgk.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cG9ocXVxcHl0aGZvdnJramdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2MjY4NDksImV4cCI6MTk4NjIwMjg0OX0.4Mlgn-_lxcrVewpthtLz6HwNQsKnSFWym3b80u1bLNs';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */
export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('/auth');
}
export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
// get profiles from Supabase
export async function getProfiles() {
    const response = await client.from('profiles').select('*');
    return checkError(response);
}
//create-profile functions
export async function upsertProfile(profile) {
    const response = await client
        .from('profiles')
        .upsert(profile, { onConflict: 'user_id' })
        .single();
    return checkError(response);
}

// can update or insert post
export async function upsertPost(post) {
    // Possible future bug? onConflict: 'user_id' or 'id'?
    const response = await client.from('posts').upsert(post, { onConflict: 'id' }).single();
    return checkError(response);
}

// get post from Supabase
export async function getPosts(profile_id) {
    const response = await client.from('posts').select('*').match({ profile_id });
    return checkError(response);
}

export async function uploadImage(imagePath, imageFile) {
    const bucket = client.storage.from('avatars');
    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });
    if (response.error) {
        return null;
    }
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}

// upload nature pics to Supabase
export async function uploadNaturePic(imagePath, imageFile) {
    const bucket = client.storage.from('naturepics');
    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });
    if (response.error) {
        return null;
    }
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}

export async function getProfile(user_id) {
    const response = await client.from('profiles').select('*').match({ user_id }).maybeSingle();

    if (!response) {
        return null;
    } else {
        return response;
    }
}

export async function getProfileById(id) {
    const response = await client.from('profiles').select('*').match({ id }).single();
    return checkError(response);
}

// get post by id for delete button event listener on profile feed
export async function getPostById(id) {
    const response = await client.from('posts').select('*').match({ id }).single();
    return checkError(response);
}

export async function deletePost(id) {
    const response = await client.from('posts').delete().match({ id }).single();
    return checkError(response);
}

export function redirectIfNoProfile() {
    location.replace('../create-profile');
}

export async function profileLikes(id) {
    const profile = await getProfileById(id);

    const response = await client
        .from('profiles')
        .update({ likes: profile.likes + 1 })
        .match({ id });

    return checkError(response);
}
//stretch  goal: search by username
export async function searchByUsername(username) {
    let query = await client
        .from('profiles')
        .select('*')
        .order('username')
        .ilike('username', `%${username}%`);
    return query;
}

// error handling
function checkError(response) {
    // eslint-disable-next-line no-console
    return response.error ? console.error(response.error) : response.data;
}
