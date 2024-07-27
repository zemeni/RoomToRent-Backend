const express = require('express');
const app = express();

const port = 4000;

const propertyRoutes = require('./src/routes/propertyRoutes');
const roomRoutes = require('./src/routes/roomRoutes');
const userRoutes = require('./src/routes/userRoutes');


app.use(express.json());

// app.use('/api', authRoutes);
app.use('/api', propertyRoutes);
app.use('/api', roomRoutes);
app.use('/api', userRoutes);

app.get("/hello", (req, res) => {
    res.json({ message: 'Hello, world!' });
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
