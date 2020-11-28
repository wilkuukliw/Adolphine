const express = require("express"); 
const app = express();
const fs = require('fs'); 
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
const remindersRoute = require('./routes/reminders.js');
app.use(remindersRoute); 
const subscribersRoute = require('./routes/subscribers.js');
app.use(subscribersRoute); 

//hange it to be neater, more advanced
app.listen(5005, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server running on port 5005");
});