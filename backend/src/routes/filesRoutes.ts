import express from "express";
import isAuth from "../middleware/isAuth";
import uploadConfig from "../config/upload";
import multer from "multer";

import * as FilesController from "../controllers/FilesController";

const upload = multer(uploadConfig);

const filesRoutes = express.Router();

filesRoutes.get("/files/list", isAuth, FilesController.list);
filesRoutes.get("/files", isAuth, FilesController.index);
filesRoutes.post("/files", isAuth, FilesController.store);
filesRoutes.put("/files/:fileId", isAuth,  FilesController.update);
filesRoutes.get("/files/:fileId", isAuth, FilesController.show);
filesRoutes.delete("/files/:fileId", isAuth, FilesController.remove);
filesRoutes.delete("/files", isAuth, FilesController.removeAll);
filesRoutes.post("/files/uploadList/:fileListId", isAuth, upload.array("files"), FilesController.uploadMedias);
export default filesRoutes;
