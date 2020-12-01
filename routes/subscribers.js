const router = require('express').Router();
const path = require('path'); 
const Subscriber = require('../models/Subscriber.js');

router.get('/subscribers', (req,res) => {
    return res.sendFile(path.join(__dirname, '../api/subscribers/subscribers.html'));
});

router.get('/subscribers/collection', async (req,res) => {
    const subscribers = await Subscriber.query().select();
    return res.send({ response : subscribers });
});

module.exports = router;