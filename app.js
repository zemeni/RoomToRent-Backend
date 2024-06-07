const express = require("express");
const accountRouter = require('./routes/accounts');


const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to RoomToRent");
})

app.use('/accounts', accountRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
})