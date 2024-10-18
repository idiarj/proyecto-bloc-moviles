import { folderModel } from "../../../models/folderModel.js";
import { SessionHandler } from "../../../data/iSession/iSession.js";

export class folderController{

    static async folderGet(req, res){
        try {
            if(!SessionHandler.verifySession(req)) return res.status(400).json({message: 'Sesion no valida.'}); 
            const {userid} = req.session;
            const folders = await folderModel.getFolders({idUser: userid});
            res.status(200).json({folders});
        } catch (error) {
            console.log(error)
            res.status(500).json({sucess: false, message: error.message});
        }
    }
    static async folderPost(req, res){
        console.log('entre en el controlador')
        try {
            if(!SessionHandler.verifySession(req)) return res.status(400).json({message: 'Sesion no valida.'});

            const {folderName} = req.body;
            const {userid} = req.session;

            const folder = await folderModel.createFolder({folderName, idUser: userid});
            res.status(200).json({...folder});
        } catch (error) {
            console.log(error)
            res.status(500).json({sucess: false, message: error.message});
        }
    }

    static async folderPut(req, res){
        try {

            if(!SessionHandler.verifySession(req)) return res.status(400).json({message: 'Sesion no valida.'});
            const {newFolderName} = req.body;
            const {folderId} = req.params;
            const folder = await folderModel.updateFolder({newFolderName, folderId});
            res.status(200).json({...folder});
        } catch (error) {
            console.log(error)
            res.status(500).json({sucess: false, message: error.message});
        }
    }

    static async folderDelete(req, res){
        try {
            if(!SessionHandler.verifySession(req)) return res.status(400).json({message: 'Sesion no valida.'});

            const {folderId} = req.params;
            const {userid} = req.session;

            const folder = await folderModel.deleteFolder({idFolder: folderId, idUser: userid});
            res.status(200).json(...folder);
        } catch (error) {
            console.log(error)
            res.status(500).json({sucess: false, message: error.message});
        }
    }
}