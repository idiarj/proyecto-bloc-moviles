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

    createNote({userId = null, noteTitle = null, noteContent = null, category = null, favorite = false}){
        if(!userId || !note || !category || !noteContent){
            return {success: false, message: 'Faltan datos para crear la nota.'}
        }
        const note = iPgHandler.exeQuery({key: 'createNote', params: [noteTitle, noteContent, userId, category, favorite]})
        console.log(note)
        return note
    }
}