const router = require('express').Router();
const path = require('path'); 
const Reminder = require('../models/Reminder.js');

router.post("/delete-reminder", async (req, res) => {
    const { id } = req.body;
 
    if (id) {
        try {
            const reminderFound = await Reminder.query().select().where('id', id).limit(1);
            if (reminderFound.length === 0) { 
                return res.status(400).send({ response: "Verify the reminder's number"
                });
                
            } else {

                const reminderDeleted = await Reminder.query().deleteById(id);

              //  return res.status(400).send({ response: "Deleted" + reminderDeleted });
            }
        
    } catch (error) {
        return res.status(500).send({ response: "Something went wrong with the database" + error});
    }

}

});

// consider clearing reminders that were sent already

module.exports = router;