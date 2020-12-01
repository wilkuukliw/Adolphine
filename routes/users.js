const router = require("express").Router();
const path = require('path');
const User = require('../models/User.js');

router.get('/accounts', (req, res) => {
    return res.sendFile(path.join(__dirname, '../api/account/accounts.html'));
});

router.get('/users/roles', async (req, res) => {
    const users = await User.query().select('username').withGraphFetched('role')  //select is optional. would default if omitted. // withgrapfethed - show also retaled roles object
    return res.send({ response : users })
    });

router.get("/setsessionvalue", (req, res) => {
    req.session.myValue = req.sessionID; 
    return res.send({ response: "SessionID is set to " + req.sessionID }); // takes the value from the request and dynamically set it here
});

router.get("/getsessionvalue", (req, res) => {
    return res.send({ response: req.sessionID });
});


router.get('/users', (req,res) => {
    return res.sendFile(path.join(__dirname, '../api/account/users.html'));
});

router.get('/users/collection', async (req,res) => {
    const users = await User.query().select();
    return res.send({ response : users });
});

module.exports = router;