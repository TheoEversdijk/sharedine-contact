import { getFriendsData, getFriendData, addFriendData, editFriend, removeFriend } from "../adapters/friendAdapter.js"

export async function getFriends(req, res) {
    const friends = {};
    const friendsData = await getFriendsData();
    console.log(friendsData);
    if (friendsData.length > 0) {
        friends.meta = {
            title: 'All friends',
            url: req.originalUrl,
        };
        friends.data = [];
        friendsData.map((friend) => {
            friends.data.push({
                url_to_self: `${req.originalUrl}/${friend.id}`,
                from: friend.from,
                to: friend.to,
                status: friend.status,
                since: friend.since
            });
        });
        res.json(friends);
    } else {
        res.status(500);
        res.json({
            title: 'No friends lmao',
            message: 'Touch grass bozo'
        });
    }
};

// get individual user
export async function getFriend(req, res) {
const user = await getFriendData(req.params.id)
if (friends.length > 0) {
    const response = {};
    response.meta = {
        title: 'individual friends',
        url: `${req.originalURL}`
    }
    response.data = friends[0];
    res.json(response);
} else {
    res.status(500).json({ message: 'I cannot find your friend'});
}
}


// add new friend
export async function addNewFriend(req, res) {

}

// edit / update friend
export async function editFriend(req, res) {

}

// remove friend
export async function removeFriend(req, res) {

}

// get friend request


