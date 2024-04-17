import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";

const directory = "uploads";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory);

    callback(null, directory);
  },
  filename(req, file, callback) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

export const singleUpload = multer({ storage }).single("photo");
