require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");

const userRoute = require("./routes/user.routes");
const contactRoute = require("./routes/contact.routes");

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", userRoute);
app.use("/api/contact", contactRoute);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Backend is reachable" });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
