const nodemailer = require("nodemailer");
require("dotenv").config();
// async..await is not allowed in global scope, must use a wrapper
exports.Mail = async (user) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
  });

  let mailOpttions = {
    from: "thanhdatnguyenat1@gmail.com", // sender address
    to: user.mail, // list of receivers
    subject: `Hello ${user.name} `, // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter.sendMail(mailOpttions, function (err, info) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Message sent!!!");
    }
  });
};
