const express = require("express");
const app = express()
const errorMiddleware = require("./middleware/error")
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")

app.use(express.json())

// Route Imports
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)

// Middleware for errors
app.use(errorMiddleware)

module.exports = app