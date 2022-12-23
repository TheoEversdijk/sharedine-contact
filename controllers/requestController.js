import { writeFriendRequest, acceptFriendRequest, declineFriendRequest, blockFriendRequest, getRequests } from "../adapters/friendAdapter.js"

export async function requestList(req, res) {
  const requests = {};
  const requestsData = await getRequests(req.params.id);
  console.log(requestsData);
  if (requestsData.length > 0) {
      requests.meta = {
          title: 'All requests',
          url: req.originalUrl,
      };
      requests.data = [];
      requestsData.map((friend) => {
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
    if (req.body.from && req.body.to) {
      friendRequest.from = req.body.from;
      friendRequest.to = req.body.to;
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
      if (req.body.id) {
        await acceptFriendRequest(req.body.id);
      } else {
        console.log(req.body.id);
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
      if (req.body.id) {
        await declineFriendRequest(req.body.id);
      } else {
        console.log(req.body.id);
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
      if (req.body.id) {
        await blockFriendRequest(req.body.id);
      } else {
        console.log(req.body.id);
        res.status(422);
        res.json({
          title: 'Could not block this user',
          message: 'Database Error',
        });
      }
    }

    // unblock

    // done