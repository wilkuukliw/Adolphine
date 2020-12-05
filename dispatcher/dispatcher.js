const credentials = require("../config/mailCredentials");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const schedule = require('node-schedule');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    pool: true,
    secure: true, // use SSL
    auth: {
        user: credentials.user,
        pass: credentials.pass
    }

});


var mailingList =[];
mailingList.toString();

const concatEmail = "anna.maria.wilczek@gmail.com";  //username.concat("@simcorp.com");
email ="anna.maria.wilczek@gmail.com";

function mailSender(email, subject, message) {
    // Send email to to notify that user has been created
    const mailOptions = {
        from: credentials.user,
        to: concatEmail,
        subject: subject,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


maillist.forEach(function (to, i , array) {
    (function(i,to){
       msg.to = to;
    transporter.mailSender(msg, function (err) {
      if (err) { 
        console.log('Sending to ' + to + ' failed: ' + err);
        return;
      } else { 
        console.log('Sent to ' + to);
      }
  
      if (i === maillist.length - 1) { msg.transport.close(); }
    });
  })(i,to)
  });

// to, subject, content


mailSender(concatEmail, 'Adolphine - User created succesfully', 
`A user has just been created using this email. \nIf you did not create this user, please notify us!\n\nKind regards\n Adolhpine`);


transporter.close();