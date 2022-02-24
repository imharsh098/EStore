import express from "express";
const app = express();

const port = 1234;
import "./connect.js";
import userRouter from "./controllers/user/index.js";
import productRouter from "./controllers/products/index.js";
app.use(express.json());

// app.use(express.static("build"));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.get("/", (req, res) => {
  res.send("<h1>Hello Everyone from Node via Nginx</h1>");
});

app.listen(port, () => {
  console.log("Server started at ", port);
});
