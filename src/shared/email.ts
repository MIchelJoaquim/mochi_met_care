// const nodemailer = require('nodemailer');

import { getErrorResponse, getSuccessResponse } from "./response";
const AWS = require('aws-sdk')
const SES = new AWS.SES()




// export const sendEmail = (to, message) => {
//     const FROM = 'micheldevelop677@gmail.com'
//     const PASSWORD = "teomara2018filha"
    
//     let transporter = configTransporter(FROM, PASSWORD)

//     let mailOptions = setMailOptions(FROM, to, "Mochi Teste uploaded PDF", message)

//     transporter.sendMail(mailOptions, (err, data) => {
//         if (err) {
//             return console.log('Error occurs');
//         }
//         return console.log('Email sent!!!');
//     });
// }

// function setMailOptions(from, to, subject, text) {
//     return {
//         from,to, subject,text
//     };
// }


// function configTransporter(senderEmail, passwordSender) {
//     return nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: senderEmail || 'micheldevelop677@gmail.com',
//             pass: passwordSender || 'teomara2018filha' 
//         }
//     });
// }


export async function sendEmail(to, text, subject) {
    const params = {
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Body: {
          Text: { Data: text }
        },
        Subject: { Data: subject },
  
      },
      Source: "micheldevelop677@gmail.com"
    }
  
    try {
      await SES.sendEmail(params).promise()
      return getSuccessResponse("Email enviado")
    } catch (error) {
      console.log(error);
  
      return getErrorResponse("Erro, o seu e-mail precisar ser verificado pela amazon")
    }
  }