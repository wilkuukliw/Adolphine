const router = require('express').Router();
const path = require('path');
const Reminder = require('../models/Reminder.js');

router.get('/reminders/collection', async(req, res) => {
    const reminders = await Reminder.query().select();
    return res.send({ response: reminders });
});

module.exports = router;