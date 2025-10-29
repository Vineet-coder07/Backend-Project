import multer from "multer";
import path from "path";
import fs from "fs";

// base upload dir inside public so files are publicly served
const UPLOAD_BASE = path.join(process.cwd(), "public", "uploads");

// ensure folders exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
ensureDir(path.join(UPLOAD_BASE, "avatars"));
ensureDir(path.join(UPLOAD_BASE, "coverImages"));

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // choose folder based on fieldname
    if (file.fieldname === "avatar") cb(null, path.join(UPLOAD_BASE, "avatars"));
    else if (file.fieldname === "coverImage") cb(null, path.join(UPLOAD_BASE, "coverImages"));
    else cb(null, UPLOAD_BASE);
  },
  filename: function (req, file, cb) {
    // use timestamp + original name to reduce collisions
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});

// file filter: only images
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeOk = allowed.test(file.mimetype);
  const extOk = allowed.test(ext);
  if (mimeOk && extOk) cb(null, true);
  else cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed"));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 MB max per file (adjust if needed)
  }
});
