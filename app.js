import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/api/auth.js";
import path from "path";

import contactsRouter from "./routes/api/contacts.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// Роздача статичних файлів
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

await connectDB();


app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
