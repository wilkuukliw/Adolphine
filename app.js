const express = require('express')
const app = express()
const fs = require('fs')
const session = require('express-session') // keep track of users logged in and authorisation

app.use(express.static('.'))
app.use(express.urlencoded({ extended: true }))

const helmet = require('helmet')
app.use(helmet({
    contentSecurityPolicy: false
}))

app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecret, //  used to determine if the user is logged-in
    resave: false,
    saveUninitialized: true
}))

// rate limiter

const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 8
})

app.use('/login', limiter)
app.use('/singup', limiter)
app.use('/resetpassword', limiter)

const navbarPage = fs.readFileSync('public/navbar/navbar.html', 'utf8')
const headPage = fs.readFileSync('public/navbar/head.html', 'utf8')
const footerPage = fs.readFileSync('public/footer.html', 'utf8')
const homePage = fs.readFileSync('public/homepage.html', 'utf8')
const loginPage = fs.readFileSync('public/account/login.html', 'utf8')
const resetPasswordPage = fs.readFileSync('public/account/resetpassword.html', 'utf8')
const sendResetPasswordPage = fs.readFileSync('public/account/sendresetmail.html', 'utf8')
const signupPage = fs.readFileSync('public/account/signup.html', 'utf8')
const scheduleReminderPage = fs.readFileSync('public/reminders/schedule-reminder.html', 'utf8')
const deleteSubscriberPage = fs.readFileSync('public/subscribers/delete-subscriber.html', 'utf8')

// admin only routes

const usersPage = fs.readFileSync('public/account/users.html', 'utf8')
const deleteReminderPage = fs.readFileSync('public/reminders/delete-reminder.html', 'utf8')
const remindersPage = fs.readFileSync('public/reminders/reminders.html', 'utf8')
const addSubscriberPage = fs.readFileSync('public/subscribers/add-subscriber.html', 'utf8')
const subscribersPage = fs.readFileSync('public/subscribers/subscribers.html', 'utf8')
const accessDeniedPage = ('<strong><p style="text-align:left;font-size:25px;">Access denied</p></strong>')

app.get('/', (req, res) => {
    return res.send(headPage + loginPage + footerPage)
})

app.get('/login', (req, res) => {
    return res.send(headPage + loginPage + footerPage)
})

app.get('/home', (req, res) => {
    if (req.session.user) {
        return res.send(headPage + navbarPage + homePage + footerPage)
    } else {
        return res.redirect('/login')
    }
})

app.get('/signup', (req, res) => {
    return res.send(headPage + signupPage + footerPage)
})

app.get('/subscribe', (req, res) => {
    return res.send(headPage + addSubscriberPage + footerPage)
})

app.get('/passwordreset', (req, res) => {
    return res.send(headPage + resetPasswordPage + footerPage)
})

app.get('/resetpassword', (req, res) => {
    return res.send(headPage + sendResetPasswordPage + footerPage)
})

app.get('/users', (req, res) => {
    const isAdmin = req.session.user.id == 1
    if (isAdmin) {
        return res.send(headPage + usersPage + footerPage)
    } else {
        return res.status(403).send(headPage + accessDeniedPage);
    }
})

app.get('/delete-reminder', (req, res) => {
    const isAdmin = req.session.user.id == 1
    if (isAdmin) {
        return res.send(headPage + deleteReminderPage + footerPage)
    } else {
        return res.status(403).send(headPage + accessDeniedPage)
    }
})

app.get('/delete-subscriber', (req, res) => {
    if (req.session.user) {
        return res.send(headPage + deleteSubscriberPage + footerPage)
    } else {
        return res.redirect('/login')
    }
})

app.get('/reminders', (req, res) => {
    const isAdmin = req.session.user.id == 1
    if (isAdmin) {
        return res.send(headPage + remindersPage + footerPage)
    } else {
        return res.status(403).send(headPage + accessDeniedPage)
    }
})

app.get('/schedule', (req, res) => {
    if (req.session.user) {
        return res.send(headPage + scheduleReminderPage + footerPage)
    } else {
        return res.redirect('/login')
    }
})

app.get('/subscribers', (req, res) => {
    const isAdmin = req.session.user.id == 1
    if (isAdmin) {
        return res.send(headPage + subscribersPage + footerPage)
    } else {
        return res.status(403).send(headPage + accessDeniedPage)
    }
})

const authRoute = require('./routes/auth.js');
app.use(authRoute);
const usersRoute = require('./routes/users.js');
app.use(usersRoute);
const scheduleReminderRoute = require('./routes/schedule-reminder.js');
app.use(scheduleReminderRoute);
const reminderRoute = require('./routes/reminder.js');
app.use(reminderRoute);
const subscribersRoute = require('./routes/subscribers.js');
app.use(subscribersRoute);
const addSubscriberRoute = require('./routes/add-subscriber.js');
app.use(addSubscriberRoute);
const deleteSubscriberRoute = require('./routes/delete-subscriber.js');
app.use(deleteSubscriberRoute);
const deleteReminderRoute = require('./routes/delete-reminder.js');
app.use(deleteReminderRoute);

/* knex and objection */

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development)

Model.knex(knex)

const port = process.env.PORT ? process.env.PORT : 5005;

app.listen(port, (error) => {
    if (error) {
        console.log('Error running the server')
    }
    console.log('Server running on port ' + port)
})

module.exports = app