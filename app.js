const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function connect() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("coneccion creada")    
}

connect().catch(console.error)

app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/user", require("./routes/user"));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/refresh-token", require("./routes/refreshToken"));
app.use("/api/getbanks", require("./routes/getbanks"));
app.use("/api/createLink", require("./routes/createLink"));


app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.listen(port, ()=> {
    console.log(`server is runing on port : ${port}`)
})