
const nodemailer = require('nodemailer')

exports.sendEmailWithNodemailer = (res, emailData) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: 'smtp.gmail.com',        
        auth: {
            user: 'lights.of.life11@gmail.com',
            pass: 'bolpuwihghimzbfe'
        },
    });

    transporter.sendMail(emailData, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            return res.json({
                message: "Email has been sent to your email. Follow the instrucations to activate your account",
            })
        }
    });

}

