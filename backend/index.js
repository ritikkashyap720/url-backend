const express = require("express");
const urlRouter = require("./routes/Url.routes");
const connectDatabase = require("./connection");
const userRouter = require("./routes/User.routes");
const cookieParser = require('cookie-parser');
const cors = require("cors")

const corsOptions = {
    origin:"http://localhost:5173",
    optionsSuccessStatus: 200
}

require("dotenv").config()

// server
const server = express();
const PORT = process.env.PORT||8000;
const monogURL = process.env.MONGO_URL
connectDatabase(monogURL).then(console.log("Database connected"))

// middlewares
server.use(cors(corsOptions))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(cookieParser())

// routes
server.use("/url",urlRouter)
server.use("/user",userRouter)

server.listen(PORT,()=>{console.log(`Server started at PORT ${PORT}`)})

