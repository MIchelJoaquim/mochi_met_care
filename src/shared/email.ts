// const nodemailer = require('nodemailer');

import { getErrorResponse, getSuccessResponse } from './response'
const AWS = require('aws-sdk')
const SES = new AWS.SES()

export async function sendEmail (to, text, subject) {
  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: { Data: text }
      },
      Subject: { Data: subject }

    },
    Source: 'micheldevelop677@gmail.com'
  }

  try {
    await SES.sendEmail(params).promise()
    return getSuccessResponse('Email enviado')
  } catch (error) {
    console.log(error)

    return getErrorResponse('Erro, o seu e-mail precisar ser verificado pela amazon')
  }
}
