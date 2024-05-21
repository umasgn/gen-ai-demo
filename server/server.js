const express = require("express");
const path = require("path");
const debug = require("debug")("app:server");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/v1/genai", require("./routes/genai.route"));

app.use(express.static(path.join(__dirname, "public")));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
} else {
  app.get(app.use(express.static(path.join(__dirname, "public"))));
}

// TODO
// App Level Error Handler

const PORT = process.env.NODE_PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
  debug(
    colors.inverse.green(
      `Server is running in ${process.env.NODE_ENV} on port ${PORT} - Hello there...`
    )
  );
});
