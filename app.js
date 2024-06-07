const express = require("express");
const accountRouter = require('./routes/accounts');


const app = express();

app.use('/users', accountRouter);

app.get("/", (req, res) => {
    res.send("Welcome to RoomToRent");
})

const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
})