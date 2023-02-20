import AWS from "aws-sdk";
import fs from "fs";
import { APP_CONFIG } from "../../config/app-config";
import path from 'path'

const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = APP_CONFIG;
// Configure the AWS SDK with your access keys
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  });
  
  // Create an instance of the S3 service
  const s3 = new AWS.S3();
  
  // Define a function to upload an image to S3
  function uploadToS3(bucketName: string, fileKey: string) {
      const dirPath = path.join(__dirname, './very-sad.png');
      console.log(dirPath, 'path..');
      
    const fileData = fs.createReadStream(dirPath);
    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: fileData,
    };
    return s3.upload(params).promise();
  }
  
  // Define a function to get an image from S3
  function getFromS3(bucketName: string, fileKey: string) {
    const params = {
      Bucket: bucketName,
      Key: fileKey,
    };
   return s3.getObject(params).promise();
  }

export {
    uploadToS3,
    getFromS3
}  
  
//   // Example usage:
  
//   (async () => {
//     const bucketName = "rau-smart-city";
//     const fileKey = "very-sad.png";
  
//   //   const response = await uploadToS3(bucketName, fileKey);
//    const {Body} = await getFromS3(bucketName, fileKey)
//     console.log(Body?.toString('base64'), "s3 response");
//   })();
//   // getFromS3(bucketName, fileKey);