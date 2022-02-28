const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./router/authRouter')
const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://counter-server:33JhjYhSNy4uAekP@cluster0.b517e.mongodb.net/auth?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()