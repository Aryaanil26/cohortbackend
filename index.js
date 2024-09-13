require('dotenv').config()
const express = require("express");
const { apiRouter } = require('./routes/v2');
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const app = express();
const port = 3000;

connectDB();

app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/api", apiRouter);

app.listen(port, () =>{
console.log(`Example app listening on port ${port}`);
});