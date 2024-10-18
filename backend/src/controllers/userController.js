import { SessionHandler } from "../../data/iSession/iSession.js"
import { loginValidation } from "../../data/iValidation/iValidation.js"
import { registerValidation } from "../../data/iValidation/iValidation.js"
import { userModel } from "../../models/userModel.js"
import { recoveryDataValidation } from "../../data/iValidation/iValidation.js"
import { iPgHandler } from "../../data/psql-data/iPgManager.js"



export class UserController{

    static async registerControlPost(req, res){
        console.log(`----- REGISTER CONTROLLER ----------`)
        try {
            console.log('entre en el trycatch del controller')
            const result = await registerValidation.validateTotal(req.body);
            const registerResult = await userModel.registerUser(result.data);
            console.log('registerResult',registerResult)
           
            if(registerResult && registerResult.success) {
                return res.json({mensaje: 'Usuario registrado exitosamente'});
            } else {
                return res.status(400).json({error: registerResult.message});
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

    static async postRecoveryData(req, res){
        try {
            if (!SessionHandler.verifySession(req)) {
                return res.json({ mensaje: 'No hay sesion activa' });
            }

            const {userid} = req.session;
            const alreadyHasQuestion = await userModel.getRecoveryData({userId: userid});
            console.log(alreadyHasQuestion)
            if(alreadyHasQuestion.success) return res.status(400).json({error: 'Ya tiene una pregunta de recuperacion establecida.'})
            const {pregunta, respuesta} = req.body;
            await recoveryDataValidation.validateTotal({pregunta, respuesta});

            const result = await userModel.setRecoveryData({userId: userid, 
                                                            question: pregunta,  
                                                            answer: respuesta});

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: 'Error al establecer los datos', detalle: error.message})
        }
    }

    static async getRecoveryQuestion(req, res){
        try {
            if (!SessionHandler.verifySession(req)) {
                return res.json({ mensaje: 'No hay sesion activa' });
            }
            const {userid} = req.session;
            const question = await userModel.getRecoveryData({userId: userid});
            res.status(200).json(question);
        } catch (error) {
            res.status(500).json({error: 'Error al obtener la pregunta', detalle: error.message})
        }
    }

    static async postRecoveryAnswer(req, res){
        try {
            if (!SessionHandler.verifySession(req)) {
                return res.json({ mensaje: 'No hay sesion activa' });
            }
            const {userid} = req.session;
            const {respuesta} = req.body;
            await recoveryDataValidation.validatePartial({respuesta});
            const result = await userModel.verifyRecoveryAnswer({userId: userid, answer: respuesta});
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: 'Error al verificar la respuesta', detalle: error.message})
        }
    }

    static async putPassword(req, res){
        try {
            if (!SessionHandler.verifySession(req)) {
                return res.json({ mensaje: 'No hay sesion activa' });
            }
            
            const {userid} = req.session;
            const {newPassword} = req.body
            await registerValidation.validatePartial({password: newPassword})
            const result = await userModel.setNewPassword({
                newPassword,
                userId: userid
            })
            await SessionHandler.closeSession(req, res)
            res.status(200).json({
                ...result,
                msg: 'Su sesion ha sido cerrada, por favor vuelva a iniciar sesion.'
            })
        } catch (error) {
            res.status(500).json({error: "Error al actualizar la contrasena", detalle: error.message})
        }
    }
}