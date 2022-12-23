import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();

const router = express.Router();

// import from controller
import { getFriendsList } from "../controllers/friendController.js"
import { friendRequest, acceptRequest, declineRequest, blockRequest, requestList } from "../controllers/requestController.js"

/**
 * all friends router
 */
 router.options('/', (req, res, next) => {
    //set header before response
    res.header({
      allow: 'GET, POST, OPTIONS',
      'Content-type': 'application/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    //response
    res.sendStatus(200);
  });

  const jsonParser = bodyParser.json()

router.get('/:id', jsonParser, getFriendsList);
router.post('/request', jsonParser, friendRequest);
router.put('/request', jsonParser, acceptRequest);
router.get('/requests/:id', jsonParser, requestList);
router.put('/request/block', jsonParser, blockRequest)
router.delete('/request', jsonParser, declineRequest);

  // add friends route ?
  // show friends route ?
  // delete friends route ?
  



export default router