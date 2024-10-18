import { iPgHandler } from "../data/psql-data/iPgManager.js";
import { CryptManager } from "../utils/security/CryptManager.js";

export class userModel{

    static async getAllUsers(){
        try{
        const result = await iPgHandler.exeQuery({key: 'select'})
        return result
        }catch(error){
            return error
        }
    }

    static async getUser({username}){
        try{
            console.log(username)
            const user = await iPgHandler.exeQuery({key: 'getUser', params: [username]})
            return user
        }catch(error){
            return {error}
        }
    }

        /**
         * Registra un nuevo usuario en la base de datos. Este método asume que el objeto proporcionado
         * contiene toda la información necesaria para crear un nuevo registro de usuario, incluyendo
         * nombre, apellido, nombre de usuario, correo electrónico y contraseña. La contraseña se cifrará
         * antes de almacenarse en la base de datos.
         *
         * @param {Object} obj - Objeto con los datos del usuario a registrar.
         * @param {string} obj.nombre - Nombre del usuario.
         * @param {string} obj.apellido - Apellido del usuario.
         * @param {string} obj.username - Nombre de usuario, debe ser único.
         * @param {string} obj.correo - Correo electrónico del usuario.
         * @param {string} obj.password - Contraseña del usuario.
         * @returns {Promise<Object>} - Promesa que resuelve a un objeto. Si el registro es exitoso,
         *                               el objeto tendrá una propiedad `success` con valor `true` y
         *                               un mensaje `message` indicando el éxito de la operación.
         *                               En caso de error, el objeto tendrá una propiedad `success` con
         *                               valor `false` y detalles del error en `message` y `error`.
         */
       static async registerUser({nombre, apellido, username, correo, password}){ 

        const hashedPassword = await CryptManager.encriptarData({data: password});
        const client = await iPgHandler.beginTransaction()



        try {
            console.log('entre en el try de user model registeruser')
            console.log(`insertando la persona ${nombre} ${apellido}`);
            const equalUsername = await this.verifyEqualUsernames({usernameCli: username})
            console.log('equalUsername es', equalUsername)
            if(!equalUsername.success) return {success: false, message: equalUsername.error};
            const [{
                id_persona
            }] = await iPgHandler.exeQuery({key: 'insert_persona', params: [nombre, apellido], client});
            console.log(`insertando el usuario ${username} ${correo} ${id_persona}`);
            await iPgHandler.exeQuery({key: 'insert_username', params:[username, correo, hashedPassword, id_persona], client});

            await iPgHandler.commitTransaction(client)
            return { success: true, message: "Usuario registrado con éxito" };
        } catch (error) {
            await iPgHandler.rollbackTransaction(client)
            console.log('error al insertar el usuario:', error);
            
            return { success: false, message: "Error al registrar el usuario", error };
        }finally{
            await iPgHandler.releaseConn(client)
        }
    }

    /**
     * Metodo estatico y asincrono para verificar un usuario existe en la base de datos.
     * @param {String} param.user - Usuario a verificar.
     * @returns {Promise<String>} - Devuelve el usuario si existe, si no devuelve undefined.
     */
    static async verifyUser({ user }){
        console.log('------VERIFY USER-------')
        try {
            console.log(`user es ${user}`)
            const resultSet = await iPgHandler.exeQuery({key: 'verifyUser', params: [user]})


            if(resultSet && resultSet.length > 0){
                return {success: true, resultSet}
            }else{
                console.log('usuario no encontrado')
                return { success: false, resultSet }
                
            }
        } catch (error) {
            return {error}
        }
    }

    static async verifyPassword({username, password_user}){
        console.log('------VERIFY PASSWORD-------')
        try{
            console.log(password_user)
            const result = await iPgHandler.exeQuery({key: 'verifyPassword', params: [username]})
            // console.log(result)

            if(result && result.length > 0){
                const [ {password} ] = result
                const validity = await CryptManager.compareData({hashedData : password, toCompare: password_user})
                return {success: validity}
            }else{
                return {success: false}
            }
        }catch(error){
            console.log(error)
            return {error}
        }
    }

    static async verifyEqualUsernames({usernameCli}){
        try {
            console.log(`usernameCLi ${usernameCli}`)
            const validUser = await this.verifyUser({user: usernameCli});
            console.log('validUser es', validUser)
            if(validUser.success){
                const [{username}] = validUser.resultSet
                const userFromModel = typeof username === 'string' ? username.toLowerCase() : null;
                console.log(`userFromModel ${userFromModel}, usernameCli ${usernameCli.toLowerCase()}, son iguales? ${(userFromModel === usernameCli.toLowerCase())} `)
                if(userFromModel === usernameCli.toLowerCase()) {
                    return {
                        success: false,
                        error: "El usuario que estás intentando registrar ya existe."
                    }
                }
            }

            return {success: true}
        } catch (error) {
            throw error;
        }
    }

    static async getRecoveryData({userId}){
        try {
            const question = await iPgHandler.exeQuery({key: 'getRecoveryQuestion', params: [userId]});
            if(question && question.length > 0){
                return {success: true, question}
            }

            return {success: false}
        } catch (error) {
            throw error;
        }
    }

    static async verifyRecoveryAnswer({userId, answer}){
        try {
            const result = await iPgHandler.exeQuery({key: 'verifyRecoveryAnswer', params: [userId]});
            if(result && result.length > 0){
                const [{respuesta}] = result
                const validity = await CryptManager.compareData({hashedData: respuesta, toCompare: answer})
                return {success: true, validity}
            }else{
                return {success: false}
            }
        } catch (error) {
            throw error;
        }
    }

    static async setRecoveryData({userId, question, answer}){
        try {

            const hashedAnswer = await CryptManager.encriptarData({data: answer});

            const recoveryData = await iPgHandler.exeQuery({key: 'insertRecoveryData', params: [userId, question, hashedAnswer]});
            return {success: true, recoveryData}
        } catch (error) {
            throw error;
        }
    }

    static async setNewPassword({newPassword, userId}){
        try {

            const hashedNewPassword = await CryptManager.encriptarData({data: newPassword})
            const result = await iPgHandler.exeQuery({key: 'updatePassword', params: [hashedNewPassword, userId] })
            return {success: true, result}
        } catch (error) {
            throw error;
        }
    }

}