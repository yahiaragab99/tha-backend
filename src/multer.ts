import multer from "multer";

// Multer configuration
const storageConfig = multer.memoryStorage();
const multerUpload = multer({ storage: storageConfig });

export default multerUpload;
