import { iPgHandler } from "../data/psql-data/iPgManager.js";

export class notesModel{

    getNotes({userId = null}){
        if(!userId){
            return {success: false, message: 'No se proporcionó un usuario.'}
        }
        const notes = iPgHandler.exeQuery({key: 'getNotes', params: [userId]})
        console.log(notes)
        return notes
    }

    createNote({userId = null, noteTitle, noteContent = null, priority = null}){
        if(!userId || !note || !priority || !noteContent){
            return {success: false, message: 'Faltan datos para crear la nota.'}
        }
        const note = iPgHandler.exeQuery({key: 'createNote', params: [userId, noteTitle, noteContent, priority]})
        console.log(note)
        return note
    }
}