import { notesModel } from "../../../models/notesModel.js";
import { SessionHandler } from "../../../data/iSession/iSession.js";
import { noteValidation } from "../../../data/iValidation/iValidation.js";

export class notesController{
    static async getNotes(req, res){
        try {
            if(!SessionHandler.verifySession(req)){
                res.status(401).json({error: 'Sesión no válida.'});
            }
            const {userid} = req.session;
            const {notes} = await notesModel.getNotes({userId: userid});
            console.log(notes)
            res.status(200).json({notas: notes, mensaje: 'Notas obtenidas con exito'});
        } catch (error) {
            res.status(500).json({success: false, message: `Error al obtener las notas: ${error.message}`});
        }
    }

    static async postNote(req, res){
        try {
            if(!SessionHandler.verifySession(req)){
                res.status(401).json({error: 'Sesión no válida.'});
                return;
            }
            const { titu_nota, conte_nota, categoria, favorito, carpeta } = req.body;
            console.log(req.session)
            const {userid} = req.session;
    
            console.log(req.body)
            console.log(titu_nota, conte_nota, categoria, favorito, carpeta)
            const noteValidationResult = noteValidation.validateTotal({titu_nota, conte_nota, categoria, favorito, carpeta})
            const note = await notesModel.createNote({userid, 
                                                    noteTitle : titu_nota, 
                                                    noteContent : conte_nota, 
                                                    category : categoria, 
                                                    favorite : favorito,
                                                    folder: carpeta});
            res.status(200).json({nota: note, mensaje: 'Nota creada con exito'});
        } catch (error) {
            res.status(500).json({success: false, message: `Error al crear la nota: ${error.message}`});
        }
    }

    static async putNote(req, res){
        try {
            
            if(!SessionHandler.verifySession(req)){
                res.status(401).json({error: 'Sesión no válida.'});
                return;
            }

            const {noteId} = req.params;
            const {userid} = req.session;

            const verifyOwner = await notesModel.verifyNoteOwner({noteId, userId: userid});
            if(!verifyOwner.success){
                res.status(401).json({error: verifyOwner.message});
                return;
            }

            const { titu_nota, conte_nota, categoria, favorito, id_carpeta } = req.body;
            await noteValidation.validatePartial({titu_nota, conte_nota, categoria, favorito, id_carpeta});
            const note = await notesModel.updateNote({noteId, 
                noteTitle : titu_nota, 
                noteContent : conte_nota, 
                category : categoria, 
                favorite : favorito,
                folder: id_carpeta});

            res.status(200).json({nota: note, mensaje: 'Nota actualizada con exito'});

        } catch (error) {
            res.status(500).json({success: false, message: `Error al actualizar la nota: ${error.message}`});
        }
    }

    static async deleteNote(req, res){
        try {
            if(!SessionHandler.verifySession(req)){
                res.status(401).json({error: 'Sesión no válida.'});
                return;
            }

            const {noteId} = req.params;
            const {userid} = req.session;

            const verifyOwner = await notesModel.verifyNoteOwner({noteId, userId: userid});
            if(!verifyOwner.success){
                res.status(401).json({error: verifyOwner.message});
                return;
            }
            const note = await notesModel.deleteNote({noteId});
            res.status(200).json({nota: note, mensaje: 'Nota eliminada con exito'});
        } catch (error) {
            res.status(500).json({success: false, message: `Error al eliminar la nota: ${error.message}`});
        }
    }
}