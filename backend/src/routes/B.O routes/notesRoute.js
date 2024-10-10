import Router from 'express';
import { notesController } from '../../controllers/B.O Controllers/notesController.js';

export const notesRouter = Router()

notesRouter.get('/getNotes', notesController.getNotes)
notesRouter.post('/createNote', notesController.createNote)