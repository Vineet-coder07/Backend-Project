import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "avatar") {
      cb(null, "./public/uploads/avatars");
    } else if (file.fieldname === "coverImage") {
      cb(null, "./public/uploads/coverImages");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });
