const router = require('express').Router();
const path = require('path');
const Subscriber = require('../models/Subscriber.js');


router.get("/subscribe", (req, res) => {
    return res.sendFile(path.join(__dirname, '../api/subscribers/add-subscriber.html'));
 });

router.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    if (email) {

        try {


            const createdSubscriber = await Subscriber.query().insert({

                    email

            });

            //first show alert and then redirect

        
    } catch (error) {
        return res.status(500).send({ response: "Something went wrong with the database" + error});
    }

} else {

    return res.status(404).send({response: "Missing mandatory fields"});

}

});

module.exports = router;