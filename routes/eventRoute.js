const express = require('express');
const router = express.Router();

const eventController = require('../controllers/events/eventController');


// get request of the event
router.get('/events', eventController.Event);

// post request of the event 
router.post('/events-post', eventController.EventPost);



module.exports = router;