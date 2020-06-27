import { diskStorage } from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  directory: tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileId = uuid();
      const [, typeFile] = file.mimetype.split('/');
      const fileName = `${fileId}.${typeFile}`;

      return callback(null, fileName);
    },
  }),
};
