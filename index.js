const express = require("express");
const { apiRouter } = require("./routes/v2");
const app = express();
const port = 3000;


app.get("/", (req,res) => {
    res.send("hello world");
});

app.use("/api", apiRouter);

app.listen(port, () =>{
console.log(`Example app listening on port ${port}`);
});