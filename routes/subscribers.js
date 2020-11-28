const router = require('express').Router();
const path = require('path'); 
const Doggo = require('../models/Subscriber.js');

router.get('/subscribers', (req,res) => {
    return res.sendFile(path.join(__dirname, '../api/subscribers.html'));
});

// router.get('/reminders/collection', async (req,res) => {
//     const reminders = await Reminder.query().select();
//     return res.send({ response : reminders });
// });


// router.get('/reminders/:id', (req,res) => {
//     return res.sendFile(path.join(__dirname, '../api/reminder.html'));
// });

// router.get('/doggo/collection/:id', async (req, res) => {
//     try {
//         const doggo = await Doggo.query().select('*').where('id', req.params.id); 
        
//         if (doggo.length > 0 ) {
//         return res.send({ response: doggo });
//         } else {
//             return res.status(400).send({ response: "Doggo with such an identifier does not exist in our database" });
//         }
//     } catch (error) {
//         return res.status(500).send({ response: "Something went wrong with the database" + error});
//     }
// });

module.exports = router;
