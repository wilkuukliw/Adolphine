const router = require('express').Router();
const path = require('path');
const Reminder = require('../models/Reminder.js');
const User = require('../models/User.js');
const dispatcher = require("../dispatcher/dispatcher.js");
const schedule = require('node-schedule');
const nodemailer = require("nodemailer");


router.get("/schedule", (req, res) => {

 //   if(req.session.user) {
        return res.sendFile(path.join(__dirname, '../api/reminders/add-reminder.html'));
 //   } else {
//        return res.redirect('/login');
 //   }
 });

router.post("/schedule", async (req, res) => {
    const { email_body, created_by, send_at } = req.body;

    //consider not to ask for credentials but fetch them from session instead

    if (email_body && created_by && send_at) {

        try {
            const userFound = await User.query().select().where('username', created_by).limit(1);
            if (userFound.length === 0) {
                return res.status(400).send({ response: "Verify the user's initials"
                });
                
            } else {

            const createdReminder = await Reminder.query().insert({

                email_body,
                created_by,
                send_at

            });

            console.log(createdReminder);

            var s = schedule.scheduleJob(createdReminder.send_at, function(){
                console.log("Sending");

                dispatcher(createdReminder);
            })
       
            //first show alert and then redirect

        }
    } catch (error) {
        return res.status(500).send({ response: "Something went wrong with the database" + error});

    }}});


 

module.exports = router;