const express = require('express');
var cors = require('cors');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

app.post('/api/email', (req, res) => {
  //   console.log('req body: ', req.body);
  let user = req.body;
  sendEmail(user);
  res.send('Hello');
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));

async function sendEmail(userDetails) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'appointmentsataarvy@gmail.com',
      pass: 'tikwrkspgzgeeska',
    },
  });

  let mailDetails = {
    from: 'appointmentsataarvy@gmail.com',
    to: 'enquiry@aarvyhealthcare.com',
    subject: 'Test mail',
    text: `Name: ${userDetails.name}, Contact: ${userDetails.contact}, Date Chosen: ${userDetails.date}, Time Chosen: ${userDetails.time}`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log('Error ' + err);
    } else {
      console.log('Email sent successfully');
    }
  });
}
