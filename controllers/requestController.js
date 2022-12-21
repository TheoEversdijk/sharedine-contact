import { writeFriendRequest, acceptFriendRequest, declineFriendRequest, blockFriendRequest, getRequests } from "../adapters/friendAdapter.js"

export async function requestList(req, res) {
  const requests = {};
  const data = await getRequests(req.params.id);
  console.log(data);
  if (data.length > 0) {
      requests.meta = {
          title: 'All requests',
          url: req.originalUrl,
      };
      requests.data = [];
      requests.map((friend) => {
          requests.data.push({
              url_to_self: `${req.originalUrl}/${friend.id}`,
              id: friend.id,
              from: friend.from,
              to: friend.to,
              status: friend.status,
              since: friend.since
          });
      });
      res.json(requests);
  } else {
      res.json({
          message: 'No request found',
          data: 0
      });
  }
}

// send friend request
export async function friendRequest(req, res) { // from, to
    const friendRequest = {};
    if (req.query.from && req.query.to) {
      friendRequest.from = req.query.from;
      friendRequest.to = req.query.to;
      friendRequest.status = "pending";
      await writeFriendRequest(friendRequest)
    } else {
      res.status(422);
      res.json({
        title: 'Cannot send friend request',
        message: `Database Error`,
      });
    }
  }

    // accept friend request
    export async function acceptRequest(req, res) { // from, to
      if (req.query.id) {
        await acceptFriendRequest(req.query.id);
      } else {
        console.log(req.query.id);
        res.status(422);
        res.json({
          title: 'Accept friend request',
          message: `Database Error`,
        });
      }
    }
    // add recipocal relationship

    // cancel friend request
    export async function declineRequest(req, res) { // from, to
      if (req.query.id) {
        await declineFriendRequest(req.query.id);
      } else {
        console.log(req.query.id);
        res.status(422);
        res.json({
          title: 'Could not decline friend request',
          message: `Database Error`,
        });
      }
    }
    // unfriend

    // block
    export async function blockRequest(req, res) {
      if (req.query.id) {
        await blockFriendRequest(req.query.id);
      } else {
        console.log(req.query.id);
        res.status(422);
        res.json({
          title: 'Could not block this user',
          message: 'Database Error',
        });
      }
    }

    // unblock

    // done