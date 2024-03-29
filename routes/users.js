const router = require('express').Router()
const User = require('../db/models/User.js')

router.get('/users/roles', async(req, res) => {
    const users = await User.query().select('username').withGraphFetched('role') // select is optional. would default if omitted. // withgrapfethed - show also retaled roles object
    return res.send({ response: users })
})

router.get('/setsessionvalue', (req, res) => {
    req.session.myValue = req.sessionID
    return res.send({ response: 'SessionID is set to ' + req.sessionID }) // takes the value from the request and dynamically set it here
})

router.get('/getsessionvalue', (req, res) => {
    return res.send({ response: req.sessionID })
})

router.get('/getsessionuser', async(req, res) => {
    try {
        const user = await User.query().select('username').where('id', req.session.user.id)

        if (user.length > 0) {
            return res.send({ response: user })
        } else {
            return res.status(400).send({ response: 'No such record found in database' })
        }
    } catch (error) {
        return res.status(500).send({ response: 'Something went wrong with the database' + error })
    }
})

router.get('/users/collection', async(req, res) => {
    if (req.session.user.id == 1) {
        const users = await User.query().select()
        return res.send({ response: users })
    } else {
        return res.status(403).send('Access denied');

    }
})

router.get('/users/collection/:id', async(req, res) => {
    try {
        const user = await User.query().select('*').where('id', req.params.id)

        if (user.length > 0) {
            return res.send({ response: user })
        } else {
            return res.status(400).send({ response: 'User with such an identifier does not exist in our database' })
        }
    } catch (error) {
        return res.status(500).send({ response: 'Something went wrong with the database' + error })
    }
})

module.exports = router