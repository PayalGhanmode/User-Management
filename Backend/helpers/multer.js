import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./profiles");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowType = ["image/png", "image/jpg", "image/jpeg"];
  if (!allowType.includes(file.mimetype)) {
    cb(new Error("Invalid file type"));
  }
  cb(null, true);
};

export const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fieldSize: 2 * 1024 * 1024 },
});
