const router = require('express').Router()
const Reminder = require('../db/models/Reminder.js')

router.get('/reminders/collection', async(req, res) => {
    if (req.session.user.id == 1) {
        const reminders = await Reminder.query().select()
        return res.send({ response: reminders })
    } else {
        return res.status(403).send('Access denied');
    }
})

module.exports = router