import { noteValidation } from "../data/iValidation/iValidation.js";
import { iPgHandler } from "../data/psql-data/iPgManager.js";


export class notesModel{

    static async getNotes({userId = null}){
        try {
            if(!userId){
                return {success: false, message: 'Faltan datos para obtener las notas.'}
            }
            const notes =  await iPgHandler.exeQuery({key: 'getNotes', params: [userId]})
            console.log('notas es', notes)
            return {success: true, message: 'Notas obtenidas exitosamente.', notes}
        } catch (error) {
            throw error;
        }
    }

    static async createNote({userid = null, noteTitle = null, noteContent = null, category = null, favorite = false, folder = null}){
        try {
            if(!userid || !noteTitle || !category || !noteContent){
                return {success: false, message: 'Faltan datos para crear la nota.'}
            }
            const note =  await iPgHandler.exeQuery({key: 'createNote', params: [noteTitle, noteContent, userid, category, favorite, folder]})
            console.log(note)
            return {success: true, message: 'Nota creada exitosamente.'}
        } catch (error) {
            throw error;
        }
    }

    static async updateNote({noteId = null, noteTitle = null, noteContent = null, category = null, favorite = false}){
        try {
            if(!noteId || !noteTitle || !category || !noteContent){
                return {success: false, message: 'Faltan datos para actualizar la nota.'}
            }
            console.log(noteId, noteTitle, noteContent, category, favorite)
            const note = await iPgHandler.exeQuery({key: 'updateNote', params: [noteTitle, noteContent, category, favorite, noteId]});
            return {success: true, message: 'Nota actualizada exitosamente.', newNote: note}
        } catch (error) {
            throw error;
        }
    }

    static async deleteNote({noteId = null}){
        try {
            const deletedNote = await iPgHandler.exeQuery({key: 'deleteNote', params: [noteId]});
            return {success: true, message: 'Nota eliminada exitosamente.'};
        } catch (error) {
            throw error;
        }
    }

    static async verifyNoteOwner({noteId = null, userId = null}){
        try {
            const result = await iPgHandler.exeQuery({key: 'verifyOwner', params: [noteId]})
            if(result && result.length > 0){
                const [{owner}] = result
                if(owner === userId){
                    console.log('eres el dueno')
                    return { success: true }
                }else{
                    return { success: false, message: 'No eres el dueno de esta nota.' }
                }
            }else{
                return { success: false, message: 'No se ha encontrado la nota.' }
            }
        } catch (error) {
            throw error;
        }
    }
}