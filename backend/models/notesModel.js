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

    static async createNote({userid = null, noteTitle = null, noteContent = null, category = null, favorite = false}){
        try {
            if(!userid || !noteTitle || !category || !noteContent){
                return {success: false, message: 'Faltan datos para crear la nota.'}
            }
            const note =  await iPgHandler.exeQuery({key: 'createNote', params: [noteTitle, noteContent, userid, category, favorite]})
            console.log(note)
            return {success: true, message: 'Nota creada exitosamente.'}
        } catch (error) {
            throw error;
        }
    }

    static async updateNote({noteId = null, noteTitle = null, noteContent = null, category = null, favorite = false}){
        try {
            const validationResult = noteValidation.validatePartial({noteId, noteTitle, noteContent, category, favorite})
        } catch (error) {
            
        }
    }
}