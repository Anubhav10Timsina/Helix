const express = require('express')
const app = express();
app.use(express.json())

const dotenv = require('dotenv')
dotenv.config();

const bcrypt = require('bcrypt')

const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoute');

app.use(noteRoutes);
app.use('/auth', authRoutes);


app.listen(3000, async ()=>{
    console.log('Server awake on http://localhost:3000');
});