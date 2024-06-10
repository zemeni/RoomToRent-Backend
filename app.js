const express = require('express');
const app = express();

const port = 3000;

const propertyRoutes = require('./src/routes/propertyRoutes');
const roomRoutes = require('./src/routes/roomRoutes');
const authRoutes = require('./src/routes/authRoutes');


app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', propertyRoutes);
app.use('/api', roomRoutes);

app.get("/hello", (req, res) => {
    res.send("hello world!");
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
