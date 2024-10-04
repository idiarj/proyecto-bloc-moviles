import { loginRouter } from './sessions-routes/loginRoute.js'
import { registerRouter } from './sessions-routes/registerRoute.js'
import { logoutRouter } from './sessions-routes/logoutRouter.js'
import { homeRouter } from './homeRouter.js'
import { notesController } from '../controllers/B.O Controllers/notesController.js'



export {
    loginRouter,
    registerRouter,
    logoutRouter,
    homeRouter,
    notesController
}