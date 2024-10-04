import { notesModel } from "../../../models/notesModel.js";
import { SessionHandler } from "../../../data/iSession/iSession.js";

export class notesController{
    static async getNotes(req, res){
        if(!SessionHandler.verifySession(req)){
            res.json({success: false, message: 'Sesión no válida.'});
            return;
        }

        const {userId} = req.body;
        const notes = await notesModel.getNotes({userId});
        res.json(notes);
    }

    static async createNote(req, res){
        if(!SessionHandler.verifySession(req)){
            res.json({success: false, message: 'Sesión no válida.'});
            return;
        }

        const {userId, noteTitle, noteContent, priority} = req.body;
        const note = await notesModel.createNote({userId, noteTitle, noteContent, priority});
        res.json(note);
    }
}