const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const companyRoute = require("./routes/companies");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(cors());
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // Generate a random unique name for the image
    const uniqueSuffix = req.body.name;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/companies", companyRoute);

app.listen(PORT, () => {
  console.log("Backend is running.");
});
