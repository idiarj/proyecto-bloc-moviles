import z from 'zod';

export const folderSchema = z.object({
    folderName: z.string().min(1,{
        message: 'El nombre de la carpeta debe tener al menos 1 caracter'
    }).max(45,{
        message: 'El nombre de la carpeta no puede tener mas de 45 caracteres'
    }),
    idUser: z.number().int().positive()
})