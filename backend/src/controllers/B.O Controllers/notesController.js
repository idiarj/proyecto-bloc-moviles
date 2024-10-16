import { notesModel } from "../../../models/notesModel.js";
import { SessionHandler } from "../../../data/iSession/iSession.js";
import { noteValidation } from "../../../data/iValidation/iValidation.js";

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
        const {userId, noteTitle, noteContent, category} = req.body;
        const noteValidationResult = noteValidation.validateTotal({noteTitle, noteContent, category})


        if(noteValidationResult.error) {
            const [{message}] = noteValidationResult.error.issues
            return res.status(406).json({error: message})
        }
        const note = await notesModel.createNote({userId, noteTitle, noteContent, category});
        res.json(note);
    }
}