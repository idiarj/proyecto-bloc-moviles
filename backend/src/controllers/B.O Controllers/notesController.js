import { notesModel } from "../../../models/notesModel.js";

export class notesController{
    static async getNotes(req, res){
        const {userId} = req.body;
        const notes = await notesModel.getNotes({userId});
        res.json(notes);
    }

    static async createNote(req, res){
        const {userId, noteTitle, noteContent, priority} = req.body;
        const note = await notesModel.createNote({userId, noteTitle, noteContent, priority});
        res.json(note);
    }
}