const router = require('express').Router(); 
const path = require('path');
const User = require('../models/User.js');
const Role = require('../models/Role.js');
const bcrypt = require('bcrypt'); 
const saltRounds = 12; 

router.post('/login', async (req, res) => {
    const {username, password} = req.body;   
    
    try {
        const userFound = await User.query().select().where('username', username);
        if (userFound.length === 0) {
            return res.status(400).send({ response: "User does not exist" });
        } 

        const match = await bcrypt.compare(password, userFound[0].password);

        if(match) {

            req.session.username = username;
            req.session.user = {id: userFound[0].id, role:userFound[0].role_id}
            return res.redirect("/home");   
        }

        } catch (error) {
            return res.status(500).send({ response: "Something went wrong with the database" + error});
        }
    return res.status(400).send({ response: "Incorrect password" });
});

router.get('/signup', (req, res) => {
    return res.sendFile(path.join(__dirname, '../api/account/signup.html'));
});

router.post('/signup', async (req, res) => {   
 
    const { username, password, passwordRepeat } = req.body;

    const isPasswordTheSame = password == passwordRepeat;

    if (username && password && isPasswordTheSame) {
        if (password.length < 8) {
            return res.status(400).send({ response: "Password does not fulfill the requirements" });
        } else {
            try {
                const userFound = await User.query().select().where({ 'username': username }).limit(1);
                if (userFound.length > 0) {
                    return res.status(400).send({ response: "User already exists" });
            } else {

                // Role model uses await instead (promise)
                const defaultUserRoles =  await Role.query().select().where({ 'role': 'USER' });

                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const createdUser = await User.query().insert({
                    username,
                    password: hashedPassword,
                    roleId: defaultUserRoles[0].id
                });



                // alert and redirect
             //   return res.send({ response: `User has been created with the username ${createdUser.username} You can now log in` });
            }

            } catch (error) {
                return res.status(500).send({ response: "Something went wrong with the database" + error });
            }

        }

    } else if (password && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({ response: "Passwords do not match. Fields: password and passwordRepeat" });
    } else {

        // sweetalert
       // return res.status(404).send({ response: "Missing fields: username, password, passwordRepeat" });
    }
    
});

router.get("/logout", (req, res) => {   
    req.session.destroy((error) => {
        if(error) {
            return res.send({ response: "Something went wrong: " + error });
        }
        return res.redirect("/login");
    });
});   

module.exports = router;