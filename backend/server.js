import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import exerciseRouter from "./routes/exercise";
import userRouter from "./routes/user";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/exercished", exerciseRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
