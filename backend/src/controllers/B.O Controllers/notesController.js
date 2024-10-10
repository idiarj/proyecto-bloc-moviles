import { notesModel } from "../../../models/notesModel.js";
import { SessionHandler } from "../../../data/iSession/iSession.js";

export class notesController{
    static async getNotes(req, res){
        if(!SessionHandler.verifySession(req)){
            res.status(401).json({success: false, message: 'Sesión no válida.'});
            return;
        }

        const {userId} = req.body;
        const notes = await notesModel.getNotes({userId});
        res.json(notes);
    }

    static async createNote(req, res){
        if(!SessionHandler.verifySession(req)){
            res.status(401).json({success: false, message: 'Sesión no válida.'});
            return;
        }

        const {userId, noteTitle, noteContent, priority} = req.body;
        if(!userId || !noteTitle || !noteContent || !priority){
            res.status(400).json({success: false, message: 'Faltan datos para crear la nota.'});
            return;
        }
        const note = await notesModel.createNote({userId, noteTitle, noteContent, priority});
        res.json(note);
    }
}