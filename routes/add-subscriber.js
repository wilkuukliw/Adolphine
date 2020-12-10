const router = require('express').Router();
const Subscriber = require('../models/Subscriber.js');

router.post('/subscribe', async(req, res) => {
    const { email } = req.body;

    if (email) {
        try {
            await Subscriber.query().insert({
                email
            });

        } catch (error) {
            return res.status(500).send({ response: 'Something went wrong with the database' + error });
        }
    }
});

module.exports = router;