const router = require('express').Router()
const Subscriber = require('../db/models/Subscriber.js')

router.get('/subscribers/collection', async(req, res) => {
    if (req.session.user.id == 1) {
        const subscribers = await Subscriber.query().select()
        return res.send({ response: subscribers })
    } else {
        return res.status(403).send('Access denied');
    }
})

module.exports = router