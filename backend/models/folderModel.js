import { iPgHandler } from "../data/psql-data/iPgManager.js";
import { SessionHandler } from "../data/iSession/iSession.js";


export class folderModel{



    static async createFolder({folderName, idUser}){
        try {
            const folder = await iPgHandler.exeQuery({key: 'createFolder', params: [folderName, idUser]});
            console.log(folder);
            return {sucess: true, message: 'Carpeta creada correctamente', folder};
        } catch (error) {
            throw error;
        }
    }

    static async deleteFolder({idFolder, idUser}){
        try {
            if(!SessionHandler.verifySession(req)){
                res.status(401).json({error: 'Sesión no válida.'});
                return;
            }
            await iPgHandler.exeQuery({key: 'deleteFolder', params: [idFolder, idUser]});
            return {sucess: true, message: 'Carpeta eliminada correctamente'};
        } catch (error) {
            throw error;
        }
    }

    static async getFolders({idUser}){
        try {
            const folders = await iPgHandler.exeQuery({key: 'getFolders', params: [idUser]});
            return {sucess: true, message: 'Carpetas obtenidas correctamente', folders};
        } catch (error) {
            throw error;
        }
    }

    static async updateFolder({newFolderName, folderId}){
        try {
            const folder = await iPgHandler.exeQuery({key: 'updateFolder', params: [newFolderName, folderId]});
            return {sucess: true, message: 'Carpeta actualizada correctamente', folder};
        } catch (error) {
            throw error;
        }
    }

    // static async getFolderNotes({folderId}){
    //     try {
    //         const notes = await 
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}