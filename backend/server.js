//modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes


//middlewares
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const partyRouter = require("./routes/partyRoutes.js");


//config
const dbName = "parttimedb";
const port = 3000;


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
//use routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/parties", partyRouter);

// mongoose connection
mongoose.connect(`mongodb+srv://pt_admin:Password%40123@cluster0.ownj9mm.mongodb.net/${dbName}?retryWrites=true&w=majority`);


app.get("/apitest", (req, res) => {
    res.status(400).json({message: "Test route OK"});
})


app.listen(port, () => console.log(`server running on ${port} port.`));