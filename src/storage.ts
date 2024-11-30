import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  keyFilename: "googleCloudKey.json",
  projectId: process.env.FIREBASE_PROJECT_ID,
});

// Creates a client from a Google service account key
// const storage = new Storage({keyFilename: 'key.json'});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

const bucket = storage.bucket(bucketName || "");
export default bucket;
