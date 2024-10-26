const express = require("express");
const { checkDBConnection } = require("./src/config/db");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const port = 4000;
const propertyRoutes = require("./src/routes/propertyRoutes");
const roomRoutes = require("./src/routes/roomRoutes");
const userRoutes = require("./src/routes/userRoutes");
const sportsRoutes = require("./src/routes/sportsRoutes");
const socialRoutes = require("./src/routes/socialRoutes");
const latestInfoRoutes = require("./src/routes/latestRoutes");
const countryRoutes = require("./src/routes/countryRoutes");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "upload");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use("/api", propertyRoutes);
app.use("/api", roomRoutes);
app.use("/api", userRoutes);
app.use("/api", sportsRoutes);
app.use("/api", socialRoutes);
app.use("/api", latestInfoRoutes);
app.use("/api", countryRoutes);

app.post("/upload", upload.array("files", 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    console.log(req.files);
  } catch (e) {
    console.log(e);
  }
});
app.get("/hello", (req, res) => {
  res.send("hello world!");
});
// checkDBConnection();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
