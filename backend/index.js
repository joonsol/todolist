const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require('cookie-parser');
dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors({
    origin:process.env.FRONT_ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongodb연결 성공"))
.catch((err)=>console.log("연결 실패",err))

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const todoRoutes = require("./routes/todoRoutes")
app.use("/api/todos",todoRoutes)




app.get("/", (req, res) => {
    res.send("Hello Express!")
})


app.listen(PORT, () => {
    console.log("Server is Running!~")
})