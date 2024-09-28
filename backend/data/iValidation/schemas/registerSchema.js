import z from "zod"

export const userRegisterSchema = z.object({
    nombre: z.string({
        required_error: 'El campo user es requerido.',
        message: 'El usuario debe ser un string.'
    }).min(2,
        {
            message: `El nombre debe tener almenos 3 caracteres.`
        }
    ).max(15,
        {
            message: `El nombre no puede tener mas de 15 caracteres.`
        }
    ),
    apellido: z.string({
        required_error: 'El campo user es requerido',
        message: 'El usuario debe ser un string.'
    }).min(3,
        {
            message: `El apellido debe tener almenos 3 caracteres.`
        }
    ).max(15,
        {
            message: `El apellido no puede tener mas de 15 caracteres.`
        }
    ),
    username: z.string({
            required_error: 'El campo user es requerido',
            message: 'El usuario debe ser un string'
        }).min(3,
            {
                message: `El nombre de usuario debe tener almenos 3 caracteres.`
            }
        ).max(15,
            {
                message: `El nombre de usuario no puede tener mas de 15 caracteres.`
            }
        ),
    correo: z.string(
            {
                required_error: 'El campo email es requerido',
            }
        ).email({
            message: 'El email no es valido.'
        }).toLowerCase(),
    password: z.string({
            required_error: 'El campo password es requerido',
            message: 'El password debe ser un string'
        }).min(6, 
            {
                message: `La contrasena debe tener almenos 6 caracteres.`
            }
        ).max(16, 
            {
                message: `La contrasena no puede tener mas de 16 caracteres.`
            }
        )
    })