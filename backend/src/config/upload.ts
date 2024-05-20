import path from "path";
import multer from "multer";
import fs from "fs";

const publicFolder = path.resolve(__dirname, "..", "..", "public");

export default {
  directory: publicFolder,
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {

      const { typeArch, fileId } = req.body;      

      let folder;

      if (typeArch && typeArch !== "announcements") {
        folder =  path.resolve(publicFolder , typeArch, fileId ? fileId : "") 
      } else if (typeArch && typeArch === "announcements") {
        folder =  path.resolve(publicFolder , typeArch) 
      }
      else
      {
        folder =  path.resolve(publicFolder) 
      }

      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder,  { recursive: true })
        fs.chmodSync(folder, 0o777)
      }
      return cb(null, folder);
    },
    filename(req, file, cb) {
      const { typeArch } = req.body;

      const fileName = typeArch && typeArch !== "announcements" ? file.originalname.replace('/','-').replace(/ /g, "_") : new Date().getTime() + '_' + file.originalname.replace('/','-').replace(/ /g, "_");
      return cb(null, fileName);
    }
  })
};
