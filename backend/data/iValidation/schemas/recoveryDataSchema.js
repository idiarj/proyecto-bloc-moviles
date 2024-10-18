import z from 'zod';

export const recoveryDataSchema = z.object({
    pregunta: z.string({
        message: 'La pregunta de recuperacion debe ser un texto',
        required_error: 'La pregunta de recuperacion es requerida',
    }).min(5,{
        message: 'La pregunta de recuperacion debe tener al menos 5 caracteres',
    }
    ).max(100, {
        message: 'La pregunta de recuperacion no puede tener mas de 100 caracteres',
    }),
})