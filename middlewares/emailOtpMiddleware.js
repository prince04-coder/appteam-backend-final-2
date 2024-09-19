// const nodemailer = require("nodemailer");

// //Nodemailer
// //transporter configuration
// const transporter = nodemailer.createTransport({
//   host: "smtppro.zoho.in",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.email,
//     pass: process.env.password //use application specific password from zoho
//   },
//   tls:{
//       rejectUnauthorized:false
//     }
// });

// //Send OTP via Email
// exports.sendOTPByEmail = (email, otp) => {
//   const mailOptions = {
//     from: '"Node Project" <' + process.env.email + '>',
//     to: email,
//     subject: "OTP Verification",
//     text: `Your OTP: ${otp}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error sending email: ", error);
//     } else {
//       console.log("Email sent: ", info.response);
//     }
//   });
// };

// //reference
// //https://stackoverflow.com/questions/65983495/nodemailer-invalid-login-535-authentication-failed

// const nodemailer = require("nodemailer");

// // Nodemailer transporter configuration for Gmail
// const transporter = nodemailer.createTransport({
//   service: "gmail",                // Use Gmail service
//   auth: {
//     user: 'companykhandelwal@gmail.com',       // Your Gmail email address (stored in environment variable)
//     pass: 'companykhandelwal04'     // Your Gmail password or App password (stored in environment variable)
//   }
// });

// // Send OTP via Email
// exports.sendOTPByEmail = (email, otp) => {
//   const mailOptions = {
//     from: '"Node Project" <' + process.env.email + '>',  // Sender’s email address with a name
//     to: email,                                           // Recipient’s email address
//     subject: "OTP Verification",                         // Subject of the email
//     text: `Your OTP: ${otp}`                             // Email body with the OTP
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error sending email: ", error);        // Log any error that occurs during email sending
//     } else {
//       console.log("Email sent: ", info.response);         // Log the success message and server response
//     }
//   });
// };
const nodemailer = require("nodemailer");

// Nodemailer transporter configuration for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: 'khandelwal.prince76@gmail.com',  // Hardcoded Gmail email address
    pass: 'owcm xxnd wttr ujxn'           // Hardcoded password or App password
  }
});

// Send OTP via Email
exports.sendOTPByEmail = (email, otp) => {
  const mailOptions = {
    from: '"Node Project" <companykhandelwal@gmail.com>',  // Hardcoded sender’s email address
    to: email,                                             // Recipient’s email address
    subject: "OTP Verification",                           // Subject of the email
    text: `Your OTP: ${otp}`                               // Email body with the OTP
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);        // Log any error that occurs during email sending
    } else {
      console.log("Email sent: ", info.response);         // Log the success message and server response
    }
  });
};