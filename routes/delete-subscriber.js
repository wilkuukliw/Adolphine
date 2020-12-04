const router = require('express').Router();
const path = require('path'); 
const Subscriber = require('../models/Subscriber.js');

router.get('/delete-subscriber', (req,res) => {
    return res.sendFile(path.join(__dirname, '../api/subscribers/delete-subscriber.html'));
});

router.post("/delete-subscriber", async (req, res) => {
    const { email } = req.body;
 
    if (email) {

        try {

            const subscriberFound = await Subscriber.query().select().where('email', email).limit(1);
            if (subscriberFound.length === 0) {
                return res.status(400).send({ response: "Verify the email"
                });
                
            } else {

            const subDeleted = await Subscriber.query().delete().where({
                email:req.body.email
            })}

        
    } catch (error) {
        return res.status(500).send({ response: "Something went wrong with the database" + error});
    }

}

});

module.exports = router;

