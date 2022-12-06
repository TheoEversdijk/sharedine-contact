import { writeFriendRequest } from "../adapters/friendAdapter.js"

// send friend request
export async function friendRequest(req, res) { // from, to
    const friendRequest = {};
    if (req.query.from && req.query.to) {
      friendRequest.from = req.query.from;
      friendRequest.to = req.query.to;
      friendRequest.status = "Pending";
      await writeFriendRequest(friendRequest)
    } else {
      res.status(422);
      res.json({
        title: 'Cannot send friend request',
        message: `Database Error`,
      });
    }

    // add friend request

    // accept friend request

    // add recipocal relationship

    // cancel friend request

    // unfriend

    // block & unblock

    // unblock

    // done
}