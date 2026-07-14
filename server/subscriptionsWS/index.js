const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/db');

const moviesController = require('./controller/moviesController')
const membersController = require('./controller/membersController')
const subscriptionsController = require('./controller/subcriptionsController')

const onStart = require('./start')

const PORT = 3000

const app = express();

app.use(cors())
app.use(express.json())

connectDB();

app.use('/movies', moviesController)
app.use('/members', membersController)
app.use('/subscriptions', subscriptionsController)


app.listen(PORT, () => {
    // onStart();
    console.log(`app is listning on http://localhost:${PORT}`)
})