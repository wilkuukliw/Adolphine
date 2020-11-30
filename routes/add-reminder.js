const router = require('express').Router();
const path = require('path');
const Reminder = require('../models/Reminder.js');
const User = require('../models/User.js');


router.get("/schedule", (req, res) => {
    return res.sendFile(path.join(__dirname, '../api/reminders/add-reminder.html'));
})

router.post("/schedule", async (req, res) => {
    const { item_1, item_2, item_3, item_4, item_5, created_by, send_at } = req.body;

    if (item_1 && item_2 && item_3 && item_4 && item_5 && created_by && send_at) {

        try {
            const userFound = await User.query().select().where('username', created_by).limit(1);
            if (userFound.length === 0) {
                return res.status(400).send({ response: "Verify the user's initials"
                });
                
            } else {

            const createdReminder = await Reminder.query().insert({

                item_1,
                item_2,
                item_3,
                item_4,
                item_5,
                created_by,
                send_at

            });

            return res.send({ response: "Reminder created" + createdReminder});
        }
    } catch (error) {
        return res.status(500).send({ response: "Something went wrong with the database" + error});
    }

} else {

    return res.status(404).send({response: "Missing mandatory fields"});

}

});

module.exports = router;