import { Router } from "express";
import { folderController } from "../../controllers/B.O Controllers/folderController.js";


export const folderRouter = Router();

folderRouter.get('/getFolders', folderController.folderGet);
folderRouter.post('/createFolder', folderController.folderPost);
folderRouter.put('/updateFolder/:folderId', folderController.folderPut);
folderRouter.delete('/deleteFolder/:folderId', folderController.folderDelete); 
folderRouter.get('/getNotes/:folderId', folderController.getNotesFromFolders);
