import Router from 'express';
import { notesController } from '../../controllers/B.O Controllers/notesController.js';

const notesRouter = Router()

notesRouter.get('/getNotes', notesController.getNotes)
notesController.post('/createNote', notesController.createNote)