require('dotenv').config();
const cors = require("cors");
const express = require("express");
const { apiRouter } = require('./routes/v2');
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const { handleError } = require('./utils/error');
const app = express();
const port = 3000;


app.use(
    cors({
    origin:`https://localhost:5173`,
    credentials:true,
})
);

connectDB();


// const cors = require('cors'); 
app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/api", apiRouter);

app.use(handleError)

app.use("", (req, res) => {
    res.status(404).json({message: "end point does not exist"});
});


app.listen(port, () =>{
console.log(`Example app listening on port ${port}`);
});