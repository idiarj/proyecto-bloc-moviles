// import { iPgHandler } from '../data/psql-data/iPgManager.js'
// import { v4 as uuidv4 } from 'uuid'
// import users from '../data/json-data/users.json' assert { type: "json" }
import express from 'express'
import cors from 'cors'
import cors_config from '../config/cors-config.json'  assert {type: 'json'}
import { loginRouter, registerRouter, logoutRouter, homeRouter, notesRouter } from '../src/routes/dispatcher.js'
import { SessionHandler } from '../data/iSession/iSession.js'
// import { iPgHandler } from '../data/psql-data/iPgManager.js'
import { isAuthMiddleware } from '../src/middlewares/isAuthMiddleware.js'


const app = express()

app.use(cors(cors_config));
app.use(SessionHandler.getSession())
app.use(express.json())


app.use('/home', isAuthMiddleware, homeRouter)


app.use('/register', registerRouter)

app.use('/login', loginRouter)

app.use('/logout', logoutRouter)

app.use('/notes', notesRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`)
});




