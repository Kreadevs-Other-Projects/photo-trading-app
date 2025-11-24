require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.routes");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", userRoute);

app.get("/test", (req, res) => {
  res.send("Server is working!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
