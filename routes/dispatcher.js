  
// const router = require('express').Router();
// const path = require('path');
// const credentials = require("../config/mailCredentials");
// const nodemailer = require("nodemailer");

// //mail scheduler

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
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//     type: 'OAuth2',
//     user: credentials.user,
//     clientId: credentials.clientId,
//     clientSecret: credentials.clientSecret,
//     refreshToken: credentials.refreshToken
//     }
// });

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
// });



// router.get("/sendMail", (req, res) => {
//     if(req.session.user) {
//         return res.sendFile(path.join(__dirname, '../public/sendMail.html'));
//     } else {
//         return res.redirect('/login')
//     }
// });

// router.post("/sendMail", async (req, res) => {

//     const {text} = req.body;

//     let transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         requireTLS: true,
//         auth: {
//         type: 'OAuth2',
//         user: credentials.user,
//         clientId: credentials.clientId,
//         clientSecret: credentials.clientSecret,
//         refreshToken: credentials.refreshToken
//         }
//     });
        
//         let mailOptions = {
//             to: 'anna.maria.wilczek@gmail.com',
//             subject: "Request from my page",
//             text: text
//         };
        
//         transporter.sendMail(mailOptions, (error) => {
//           if (error) {
//              return console.log(error.message);
//           }
//         }); 
        
//         //on success - there is sweetalert implemented
//     });

// module.exports = router;