import * as AWS from "aws-sdk";
import * as fileType from "file-type";
import * as uuid from 'uuid';
import { getErrorResponse, getSuccessResponse } from "./response";

const S3 = new AWS.S3();

export const uploadPdfToS3 = async (file) => {
  try {

    const { buffer,  detectedMime, key} = await prepareData(file)

    return sendFile(buffer, key, detectedMime, process.env.S3_BUCKET_PDF)

  } catch (error) {
    console.log(error);

    return getErrorResponse("Impossible decode file")
  }
};

async function prepareData(file) {
  const pdfData = file.replace(/^data:.+;base64,/, "")
  const buffer = Buffer.from(pdfData, 'base64')
  const fileInfo = await fileType.fromBuffer(buffer)
  const detectedExtension = fileInfo.ext
  const detectedMime = fileInfo.mime

  const name = uuid.v1()
  const key = `${name}.${detectedExtension}`
  return {pdfData, buffer, detectedExtension, detectedMime, name, key}
}


async function sendFile(body, key, contentType, bucket) {
  try {
    const paramsS3 = {
      Body: body,
      Key: key,
      ContentType: contentType,
      Bucket: bucket,
    }
    await S3.putObject(paramsS3).promise()

    const url = `https://${process.env.S3_BUCKET_PDF}.s3.amazonaws.com/${key}`

    return url
  } catch (error) {
    console.log(error);

    return getErrorResponse("Error, file not uploaded")
  }
}