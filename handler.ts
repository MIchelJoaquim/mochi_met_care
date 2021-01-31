import { APIGatewayProxyHandler } from 'aws-lambda'

import 'source-map-support/register'
import { getErrorResponse, getSuccessResponse } from './src/shared/response'
import { uploadPdfToS3 } from './src/shared/upload'
import * as UserService from './src/user/service'
import { userDTO } from './src/user/userDTO'
import { sendEmail } from './src/shared/email'

const allowedMimes = ['application/pdf']

export const save: APIGatewayProxyHandler = async (event, _context) => {
  const requestBody: userDTO = JSON.parse(event.body)
  return UserService.create(requestBody)
}

export const upload: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const body = JSON.parse(event.body)

    validate(body)

    const pdfData = body.file

    const url = await uploadPdfToS3(pdfData)
    await sendEmail(body.email, `O seu ficheiro encontra-se em um servidor S3 da amazon.\n ${url}`, 'Mochi Aptitude')
    return getSuccessResponse('Ficheiro carregado e E-mail enviado!')
  } catch (error) {
    console.log(error)
    return getErrorResponse('Error')
  }
}

function validate (body) {
  if (isInvalidBody(body)) {
    return getErrorResponse('Error on body request, please verify if your body request had file, mime and email field.')
  }

  if (isInvalidMime(body.mime)) {
    return getErrorResponse('Mime is not allowed, please enter a application/pdf mime')
  }
}

function isInvalidBody (body) {
  return !body || !body.file || !body.mime || !body.email
}

function isInvalidMime (mime) {
  return !allowedMimes.includes(mime)
}
