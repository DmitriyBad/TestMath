
const nodemailer = require('nodemailer');

 //let testEmailAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
      /*host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
           user: 'im.dmitriy.bovkyn@gmail.com',
           pass: '*******'
              }
        },*/
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'nedra.spencer67@ethereal.email',
            pass: '8tJRuChDSDfacUTy18'
        }},
        {
          from: 'Node js" <nedra.spencer67@ethereal.email>',
        }
)

const mailer = message => {
  console.log(message);
  transporter.sendMail(message, (err,info) => {
    if (err) return console.log(err)
    console.log('Email sent:' ,info)
  })
}
    
module.exports = mailer;  
 