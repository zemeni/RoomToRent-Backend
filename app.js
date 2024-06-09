const express = require('express');
const roomRoutes = require('./src/routes/roomRoutes');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the room routes
app.use('/api', roomRoutes);

app.get("/hello", (req, res) => {
    res.send("hello world!");
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
