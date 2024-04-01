//modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes


//middlewares


//config
const dbName = "parttimedb";
const port = 3000;


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.json({message: "Test route OK"});
})


app.listen(port, () => console.log(`server running on ${port} port.`));