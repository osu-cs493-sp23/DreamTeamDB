import multer from 'multer';
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const imageTypes = {
      'application/pdf': 'pdf',
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const upload = multer({
      storage: multer.diskStorage({
            destination: `${__dirname}/uploads`,
            filename: (req, file, callback) => {
                  const filename = file.originalname.split('.')[0]
                  const extension = imageTypes[file.mimetype]
                  callback(null, `${filename}.${extension}`)
            }
      }),
      fileFilter: (req, file, callback) => {
            callback(null, !!imageTypes[file.mimetype])
      }

}).single('file')

export default upload;
