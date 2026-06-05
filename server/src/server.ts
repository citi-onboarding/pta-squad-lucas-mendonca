import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dns from "dns";
import "@database";
import loanRoutes from "./routes/loanRoutes";
import bookRoutes from "./routes/bookRoutes";
import mailRoutes from "./routes/mailRoutes";

dotenv.config();

dns.setDefaultResultOrder('ipv4first');

const app = express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/loans", loanRoutes);
app.use("/books", bookRoutes);
app.use("/mail", mailRoutes);

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log("📦 Server running");
});