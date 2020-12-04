const express = require("express"); 
const app = express();
const fs = require("fs"); 
const session = require('express-session'); 

app.use(express.static('.'));
app.use(express.urlencoded({extended: true})); 

app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecret,  
    resave: false,  
    saveUninitialized: true
}));


const navbarPage = fs.readFileSync("api/navbar/navbar.html", "utf8");  
const footerPage = fs.readFileSync("api/footer.html", "utf8");
const homePage = fs.readFileSync("api/homepage.html", "utf8");   
const loginPage = fs.readFileSync("api/account/login.html", "utf8"); 

app.get("/", (req,res) => {
    return res.send(loginPage + footerPage);   
});

app.get("/login", (req,res) => {
    return res.send(loginPage + footerPage);   
});

app.get("/home", (req,res) => {    
    
    if(req.session.user) {
        return res.send(navbarPage + homePage + footerPage);   
} else {
    return res.redirect('/login');
}
});

const authRoute = require('./routes/auth.js');   
app.use(authRoute);      
const usersRoute = require('./routes/users.js');
app.use(usersRoute);  
const addReminderRoute = require('./routes/add-reminder.js');
app.use(addReminderRoute);  
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


//MAILER STUFF

// //const path = require('path');
// const credentials = require("./config/mailCredentials");
// const nodemailer = require("nodemailer");

// //mail scheduler wrapped in the function

// function mailSender(email,subject,message) {
//  // e-mail message options

//  let mailOptions = {
//     from: credentials.user,
//     to: 'anwi@simcorp.com',
//     subject: 'Email from Adolphine: A Test Message!',
//     text: 'Some content to send'
// };

// // e-mail transport configuration

// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//         user: credentials.user,
//         pass: credentials.pass
//     }
// });

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
// });
//}

//change it to be neater, more advanced
app.listen(5005, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server running on port 5005");
});