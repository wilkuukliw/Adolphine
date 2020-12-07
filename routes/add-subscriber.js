const router = require('express').Router();
const path = require('path');
const Subscriber = require('../models/Subscriber.js');

router.post("/subscribe", async(req, res) => {
    const { email } = req.body;

    if (email) {
        try {
            const createdSubscriber = await Subscriber.query().insert({
                email
            });
            //first show alert and then redirect
        } catch (error) {
            return res.status(500).send({ response: "Something went wrong with the database" + error });
        }
    }
});

module.exports = router;