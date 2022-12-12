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
