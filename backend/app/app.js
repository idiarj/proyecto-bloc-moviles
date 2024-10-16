import express from 'express'
import cors from 'cors'
import cors_config from '../config/cors-config.json'  assert {type: 'json'}
import { userRouter, homeRouter, notesRouter } from '../src/routes/dispatcher.js'
import { SessionHandler } from '../data/iSession/iSession.js'
import { isAuthMiddleware } from '../src/middlewares/isAuthMiddleware.js'


const app = express()

app.use(cors(cors_config));
app.use(SessionHandler.getSession())
app.use(express.json())


app.use('/home', isAuthMiddleware, homeRouter)


app.use('/user', userRouter);

app.use('/notes', notesRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`)
});




