import { SessionHandler } from "../../data/iSession/iSession.js"
import { loginValidation } from "../../data/iValidation/iValidation.js"
import { registerValidation } from "../../data/iValidation/iValidation.js"
import { userModel } from "../../models/userModel.js"



export class UserController{

    static async registerControlPost(req, res){
        console.log(`----- REGISTER CONTROLLER ----------`)



        try {
            console.log('entre en el trycatch del controller')
            const result = await registerValidation.validateTotal(req.body);
            const registerResult = await userModel.registerUser(result.data);
            console.log(registerResult)
           
            if(registerResult && registerResult.success) {
                return res.json({mensaje: 'Usuario registrado exitosamente'});
            } else {
                return res.status(400).json({error: 'No se pudo registrar el usuario'});
            }
        } catch (error) {

            return res.status(400).json({error: 'Error al registrar el usuario', detalle: error.message});
        }
    }

    /**
     * Controlador para logear a un usuario
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     *
     */
    static async loginControlPost(req, res){
        try{
            const result = await loginValidation.validateTotal(req.body)
            if(SessionHandler.verifySession(req)) return res.json( {mensaje: `Ya hay una sesion iniciada con el usuario ${req.session.username}` });
            if(result.error) return res.status(400).json({mensaje: 'Datos no validos', error: result.error})
            console.log(result.data)
            const {username, password} = result.data
            console.log(`Usuario: ${username}, Password: ${password}`)

            const validUser = await userModel.verifyUser({user: username})
            console.log(validUser)
            console.log('el usuario es valido?', validUser)
            if(!validUser.success) return res.status(400).json({error: 'Este nombre de usuario no existe.'})

            const validPassword = await userModel.verifyPassword({username, password_user: password})

            
            console.log('la contrasena es valida?', validPassword)
            console.log(`valid password es`)
            console.log(validPassword)

            if(validUser.error || validPassword.error) return res.status(400).json({
                error: 'Hubo un error interno, disculpe. (Los desarrolladores son idiotas)'
            })
            
            if(!validPassword.success) return res.status(400).json({error: 'La contrasena es incorrecta, intente de nuevo.'})
            // const [user] = await userModel.getUser({username})
            // console.log(user)
            const [user] = validUser.resultSet
            console.log(`ahora creare sesion con`, user)
            await SessionHandler.createSession({req, user})
            return res.json({mensaje: `Usuario ${username} logeado`})
        }catch(error){
            return res.status(500).json({
                error: 'Error al iniciar sesion, por favor intente de nuevo.', 
                detalle: error.message 
            })
        }

    }

    static async loginControlGet(req, res){
        console.log(req.session)
        console.log(req.body)
        if(SessionHandler.verifySession(req)) return res.json({metodo: req.method, mensaje: `Bienvenido ${req.session.username}`})
        return res.json({mensaje: 'No hay una sesion iniciada'})
    }

    
    static async logoutControlPost(req, res){
        try {
            if (!SessionHandler.verifySession(req)) {
                return res.json({ mensaje: 'No hay sesion activa' });
            }
            const result = await SessionHandler.closeSession(req, res);
            return res.json(result);
            } catch (err) {
                return res.json({ err });
            }
        }

}