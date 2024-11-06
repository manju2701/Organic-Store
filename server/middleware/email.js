const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "parikapallymanju@gmail.com",
    pass: "fnpu dhnb mzib mnei",
  },
});


module.exports = {
    transporter 
}