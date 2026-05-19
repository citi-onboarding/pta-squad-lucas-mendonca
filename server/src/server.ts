import dotenv from "dotenv";
import express from "express";
import "@database";
import loanRoutes from "./routes/loanRoutes";
import bookRoutes from "./routes/bookRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/loans", loanRoutes);
app.use("/books", bookRoutes);

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log("📦 Server running");
});
