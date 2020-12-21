const router = require('express').Router()
const User = require('../db/models/User.js')
const Role = require('../db/models/Role.js')
const nodemailer = require('nodemailer')
const credentials = require('../config/mailCredentials')
const bcrypt = require('bcrypt')
const saltRounds = 12
const { v4: uuidv4 } = require('uuid')

const resetPasswordDict = {} // Dictionary that can contain username and tokens for password reset

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: credentials.user,
        pass: credentials.pass
    }
})

const concatEmail = 'anna.maria.wilczek@gmail.com' // username.concat('@simcorp.com');

function mailSender(email, subject, message) {
    // Send email to to notify that user has been created
    const mailOptions = {
        from: credentials.user,
        to: concatEmail,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}

/* Auth Routes */

router.post('/login', async(req, res) => {
    const { username, password } = req.body

    try {
        const userFound = await User.query().select().where('username', username)
        if (userFound.length === 0) {
            return res.status(400).send({ response: 'User does not exist' })
        }

        const match = await bcrypt.compare(password, userFound[0].password)

        if (match) {
            req.session.username = username
            req.session.user = { id: userFound[0].id, role: userFound[0].role_id }
            req.session.uuid = userFound[0].uuid // // Add the users UUID, to show that we are logged in with the specific user
            return res.redirect('/home')
        }
    } catch (error) {
        return res.status(500).send({ response: 'Something went wrong with the database' + error })
    }
    return res.status(400).send({ response: 'Incorrect password' })
})

router.post('/signup', async(req, res) => {
    const { username, password, passwordRepeat } = req.body

    const isPasswordTheSame = password === passwordRepeat

    if (username && password && isPasswordTheSame) {
        if (password.length < 8) {
            return res.status(400).send({ response: 'Password does not fulfill the requirements' })
        } else {
            try {
                const userFound = await User.query().select().where({ username: username }).limit(1)
                if (userFound.length > 0) {
                    return res.status(400).send({ response: 'User already exists' })
                } else {
                    const defaultUserRoles = await Role.query().select().where({ role: 'USER' })
                    const concatEmail = 'anna.maria.wilczek@gmail.com' // username.concat('@simcorp.com');

                    const hashedPassword = await bcrypt.hash(password, saltRounds)

                    const uniqueId = uuidv4() // creates the UUID, that is to be used as an identifier in session

                    await User.query().insert({
                        username,
                        password: hashedPassword,
                        email: concatEmail,
                        roleId: defaultUserRoles[0].id,
                        UUID: uniqueId
                    })

                    mailSender(concatEmail, 'Adolphine - User created succesfully',
                        'A user has just been created using this email. \nIf you did not create this user, please notify us!\n\nKind regards\n Adolhpine')
                }
            } catch (error) {
                return res.status(500).send({ response: 'Something went wrong with the database' + error })
            }
        }
    } else if (password && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({ response: 'Passwords do not match. Fields: password and passwordRepeat' })
    }
})

router.get('/logout', (req, res) => {
    req.session.uuid = null
    req.session.destroy((error) => {
        if (error) {
            return res.send({ response: 'Something went wrong: ' + error })
        }
        return res.redirect('/login')
    })
})

router.post('/resetpassword', async(req, res) => {
    const { username } = req.body

    const userFound = await User.query().select().where({ username: username }).limit(1)

    if (userFound.length > 0) {
        const email = 'anna.maria.wilczek@gmail.com'

        // If the mail provided is the one associated with the user
        if (email !== undefined && email === userFound[0].email) {
            // Define a token for the user to log in with:
            const userToken = userFound[0].uuid
            resetPasswordDict[userFound[0].username] = userToken
            console.log(userToken)

            mailSender(email, 'Adolphine - Reset your password',
                'A password reset of your user has been requested.\n\n' +
                `Go to http://localhost:5005/passwordReset?username=${username}&token=${userToken} to reset password.\n\n` +
                'If you did not do this, you can ignore this mail.\n\nKind regards,\nAdolphine')
        } else {
            return res.send({ response: 'User or email is not correct' })
        }
    } else {
        return res.send({ response: 'User does not exist' })
    }
})

router.post('/passwordreset', async(req, res) => {
    const username = req.body.username
    const token = req.body.token
    const password = req.body.password
    const passwordRepeat = req.body.passwordRepeat

    // Check if the token is the one saved in the dictionary
    if (resetPasswordDict[username] = token) {
        // If it is, check if password and passwordRepeat match
        if (password !== undefined && password === passwordRepeat) {
            // if they do, hash password and save it to the database
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            await User.query().where('username', '=', username).update({ password: hashedPassword })

            // Remove the entry in our dictionary
            delete resetPasswordDict[username]
            return res.status(200).send({ response: 'Success. You can now log in' })
        } else {
            return res.status(401).send({ response: 'Passwords must match eachother' })
        }
    } else {
        return res.status(401).send({ response: 'Invalid token entered' })
    }
})

module.exports = router