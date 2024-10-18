import z from 'zod'

export const noteSchema = z.object({
    titu_nota: z.string({
        required_error: 'La nota debe tener un titulo.',
        message: 'El titulo debe ser un string'
    }).min(2).max(35),
    conte_nota: z.string({
        message: 'El contenido de la nota debe ser un string'
    }).max(250).optional(),
    favorito: z.boolean({
        message: 'El campo favorito debe ser un booleano.'
    }),
    categoria: z.number({
        message: 'La categoría de la nota debe ser un número.',
        required_error: 'La nota debe tener una categoría.'
    }).int({
        message: 'La categoría de la nota debe ser un número entero.',
        required_error: 'La nota debe tener una categoría.'
    }),
    folder: z.number({
        message: 'La carpeta no es valida.'
    }).int({
        message: 'La carpeta no es valida.',
    }).optional(),
})