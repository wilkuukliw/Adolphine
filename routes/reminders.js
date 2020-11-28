const router = require('express').Router();
const path = require('path'); 
const Reminder = require('../models/Reminder.js');

router.get('/reminders', (req,res) => {
    return res.sendFile(path.join(__dirname, '../api/reminders.html'));
});

router.get('/reminders/collection', async (req,res) => {
    const reminders = await Reminder.query().select();
    return res.send({ response : reminders });
});


router.get('/reminders/:id', (req,res) => {
    return res.sendFile(path.join(__dirname, '../api/reminder.html'));
});

router.get('/reminder/collection/:id', async (req, res) => {
    try {
        const reminder = await Reminder.query().select('*').where('id', req.params.id); 
        
        if (reminder.length > 0 ) {
        return res.send({ response: reminder });
        } else {
            return res.status(400).send({ response: "reminder with such an identifier does not exist in our database" });
        }
    } catch (error) {
        return res.status(500).send({ response: "Something went wrong with the database" + error});
    }
});

module.exports = router;