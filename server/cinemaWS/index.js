const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/db');


const authController = require('./controller/authController');
const usersController = require('./controller/usersController')
const permissionsController = require('./controller/permissionsController')
const openAIController = require('./controller/openAIController')


const PORT = 3001

const app = express();

app.use(cors())
app.use(express.json())

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


connectDB();


app.use('/auth', authController);
app.use('/users', usersController)
app.use('/permissions', permissionsController)
app.use('/openai', openAIController)


app.listen(PORT, () => {
    console.log(`app is listning on http://localhost:${PORT}`)
})