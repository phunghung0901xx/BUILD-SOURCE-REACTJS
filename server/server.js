const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 4000

const dbConnect = require('./config/dbConnect')
const authRouter = require('./routes/authRoute')
const bodyParser = require("body-parser")
const {notFound, errorHandler} = require("./middlewares/errorHandler")
const cookies = require("cookie-parser");
const productRouter = require("./routes/productRoute")
const morgan = require("morgan")
dbConnect()

app.use(morgan("dev"))
app.use(cookies())
app.use(express.json());
app.use('/api/user', authRouter)
app.use('/api/product', productRouter)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`)
})

