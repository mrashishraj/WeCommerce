const app = require("./app");
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary")


// handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to uncaught exception");

    process.exit(1)
})

//config
dotenv.config({path:"backend/config/config.env"})

// connecting to database
connectDatabase() 

// Cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

// starting server
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started and working on ${process.env.PORT}`);
})

// unhendaled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to unhendaled promise rejection");

    server.close(()=>{
        process.exit(1)
    })
})