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

    static async deleteFolder({idFolder}){
        const client = await iPgHandler.beginTransaction();
        try {

            await iPgHandler.exeQuery({key: 'deleteNotesFromFolder', params: [idFolder], client});
            await iPgHandler.exeQuery({key: 'deleteFolder', params: [idFolder], client});
            await iPgHandler.commitTransaction(client);
            return {sucess: true, message: 'Carpeta eliminada correctamente'};
        } catch (error) {
            await iPgHandler.rollbackTransaction
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
            console.log('folder es:', folder);
            return {sucess: true, message: 'Carpeta actualizada correctamente', folder};
        } catch (error) {
            throw error;
        }
    }

    static async getFolderNotes({folderId}){
        try {
            const notes = await iPgHandler.exeQuery({key: 'getNotesFromFolder', params: [folderId]});
            return {sucess: true, message: 'Notas obtenidas de la carpeta correctamente', notes};
        } catch (error) {
            throw error;
        }
    }
}