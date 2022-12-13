const SUPABASE_URL = 'https://fypohquqpythfovrkjgk.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cG9ocXVxcHl0aGZvdnJramdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2MjY4NDksImV4cCI6MTk4NjIwMjg0OX0.4Mlgn-_lxcrVewpthtLz6HwNQsKnSFWym3b80u1bLNs';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

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
    return response;
}

// error handling
function checkError(response) {
    return response.error ? console.error(response.error) : response.data;
}
