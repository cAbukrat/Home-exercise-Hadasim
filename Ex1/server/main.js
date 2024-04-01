const express = require('express')
const cors = require('cors')
const membersRouter = require('./routers/membersRouter')
const coronaRouter = require('./routers/coronaRouter')
const connectDB = require('./configs/db')
const path = require('path');

const app = express()
const port = 8000

connectDB()

app.use(express.json())
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/members', membersRouter)
app.use('/api/corona', coronaRouter)

app.listen(port , () => {
    console.log(`app is listening at http://localhost:${port}`);
});
