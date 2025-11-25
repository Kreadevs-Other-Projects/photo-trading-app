require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.routes");
const http = require("http");

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://192.168.100.60:8080"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", userRoute);

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Backend is reachable" });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
