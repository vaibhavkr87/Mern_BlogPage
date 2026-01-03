import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({}), // temp storage
});

export default upload;
