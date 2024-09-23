import { S3Client } from "@aws-sdk/client-s3";
export const Bucket = process.env.NEXT_AWS_S3_BUCKET_NAME as string;
export const s3 = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_KEY as string,
  },
});
