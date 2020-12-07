const express = require("express");
const app = express();
const fs = require("fs");
const session = require('express-session');

app.use(express.static('.'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecret,
    resave: false,
    saveUninitialized: true
}));

const navbarPage = fs.readFileSync("api/navbar/navbar.html", "utf8");
const headPage = fs.readFileSync("api/navbar/head.html", "utf8");
const footerPage = fs.readFileSync("api/footer.html", "utf8");
const homePage = fs.readFileSync("api/homepage.html", "utf8");
const loginPage = fs.readFileSync("api/account/login.html", "utf8");
const resetPasswordPage = fs.readFileSync("api/account/resetpassword.html", "utf8");
const sendResetPasswordPage = fs.readFileSync("api/account/sendresetmail.html", "utf8");
const signupPage = fs.readFileSync("api/account/signup.html", "utf8");
const usersPage = fs.readFileSync("api/account/users.html", "utf8");
const deleteReminderPage = fs.readFileSync("api/reminders/delete-reminder.html", "utf8");
const scheduleReminderPage = fs.readFileSync("api/reminders/schedule-reminder.html", "utf8");
const remindersrPage = fs.readFileSync("api/reminders/reminders.html", "utf8");
const addSubscriberPage = fs.readFileSync("api/subscribers/add-subscriber.html", "utf8");
const deleteSubscriberPage = fs.readFileSync("api/subscribers/delete-subscriber.html", "utf8");
const subscribersPage = fs.readFileSync("api/subscribers/subscribers.html", "utf8");

app.get("/", (req, res) => {
    return res.send(headPage + loginPage + footerPage);
});

app.get("/login", (req, res) => {
    return res.send(headPage + loginPage + footerPage);
});

app.get("/home", (req, res) => {

    if (req.session.user) {
        return res.send(headPage + navbarPage + homePage + footerPage);
    } else {
        return res.redirect('/login');
    }
});

app.get('/signup', (req, res) => {
    return res.send(headPage + signupPage + footerPage);
});

app.get("/subscribe", (req, res) => {
    return res.send(headPage + addSubscriberPage + footerPage);
});

app.get('/resetpassword', (req, res) => {
    return res.send(headPage + resetPasswordPage + footerPage);
});

app.get('/passwordreset', (req, res) => {
    return res.send(headPage + sendResetPasswordPage + footerPage);

});

app.get('/users', (req, res) => {
    return res.send(headPage + usersPage + footerPage);
});

app.get('/delete-reminder', (req, res) => {
    return res.send(headPage + deleteReminderPage + footerPage);
});

app.get('/delete-subscriber', (req, res) => {
    return res.send(headPage + deleteSubscriberPage + footerPage);
});

app.get('/reminders', (req, res) => {
    return res.send(headPage + remindersrPage + footerPage);
});

app.get("/schedule", (req, res) => {

    //   if(req.session.user) {
    return res.send(headPage + scheduleReminderPage + footerPage);
    //   } else {
    //        return res.redirect('/login');
    //   }
});

app.get('/subscribers', (req, res) => {
    return res.send(headPage + subscribersPage + footerPage);
});

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

const knex = Knex(knexFile.development);

Model.knex(knex);

//change it to be neater, more advanced
app.listen(5005, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server running on port 5005");
});