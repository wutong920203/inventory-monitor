"use strict";
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("process");

// async..await is not allowed in global scope, must use a wrapper
async function email(subject, text) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "wutong920203@gmail.com", // generated ethereal user
      pass: "wqiuqubymhbqqjxw", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    priority: "high",
    from: '"Tong Wu" <wutong920203@gmail.com>', // sender address
    to: "tongsblog@gmail.com", // list of receivers
    subject: subject, // Subject line
    text: "Product found", // plain text body
    html: `<h1>Product found.</h1><div>${text}</div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// 
module.exports = { email }