import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' })

console.log('url', process.env.SUPABASE_URL);

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Get Full Friends Table
export async function getFriendsData() {
    const { data, error } = await supabase.from('friends').select('*');
    if (error) console.log('Query error', error);
    else return data;
}

// Add Friend Data
export async function addFriendData(friend) {
    const { data, error } = await supabase.from('friends').insert([
        {
            from: friend.from,
            to: friend.to,
            status: friend.status,
            since: friend.since,
        },
    ]);
    if (error) console.log('Query error', error);
    else return data;
}

/**
 * 
 * @param {*} from The user ID
 * @returns All friend relations from the specified userID
 */
export async function getFriendData(id) {
    const { data, error } = await supabase.from('friends').select('*').eq('id', id);
    if (error) console.log('Query error', error);
    else return data;
}

/**
 * 
 * @param {id} from The user ID
 * @returns
 */
export async function editFriend(id, friend) {
    const { data, error } = await supabase.from('friends').update([
        {
            username: friend.username,
            status: friend.status,      //Pending, Blocked, Friends
            from: friend.from,
            to: friend.to,
            since: friend.since
        },
    ]).eq('id', id);
    if (error) console.log('Query error', error);
    else return data;
}

// Remove Friend Data
export async function removeFriend(from) {
    const { data, error } = await supabase.from('friends').delete().eq('from', from);
    if (error) console.log('Query error', error);
    else return data;

}

export async function writeFriendRequest(friendRequest) {
    const { data, error } = await supabase.from('friends').insert([
        {
            from: friendRequest.from,
            to: friendRequest.to,
            status: friendRequest.status
        },
    ]);
    if (error) console.log('Query error', error);
    else return data;
}

export async function acceptFriendRequest(id) {
    const { data, error } = await supabase.from('friends').update(
        {
            status: "Friends"
        },
    ).eq("id", id);
    if (error) console.log('Query error', error);
    else return data;
}

export async function declineFriendRequest(id) {
    const { data, error } = await supabase.from('friends').delete().eq("id", id);
    if (error) console.log('Query error', error);
    else return data;
}

// from, to, status

// 1, 2, B
// 2, 1, F