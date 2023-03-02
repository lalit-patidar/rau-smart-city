import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createWriteStream } from "fs";
import { APP_CONFIG } from "../../config/app-config";

const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = APP_CONFIG;

// Create an instance of the S3 service
const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

// Define a function to upload an image to S3
async function uploadToS3(
  bucketName: string,
  fileData: Buffer,
  fileName: string
) {
  const uploadParams = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileData,
  };
  try {
    const uploadCommand = new PutObjectCommand(uploadParams);
    const uploadOutput = await s3.send(uploadCommand);

    return uploadOutput;
  } catch (error) {
    console.log(error, "error in upload s3");
  }
}

// Define a function to get an image from S3
async function getFromS3(bucketName: string, fileKey: string) {
  const getParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  try {
    const getCommand = new GetObjectCommand(getParams);
    const getObjectOutput = await s3.send(getCommand);

    return getObjectOutput

 
      if (getObjectOutput.Body) {
        // Do something with the image data, e.g. save it to a file
        const writeStream = createWriteStream("./image.jpg");
        //@ts-ignore
        getObjectOutput.Body.pipe(writeStream);
      }

  } catch (error: any) {
    console.log("error in getting s3 image");
    throw new Error(error.message);
  }
}

export { uploadToS3, getFromS3 };
