import path from "path";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();

app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow both ports
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); 
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist"))); //  frontend application handles client-side routing.

app.get("*", (req, res) => {
    	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });// allows the frontend application to handle client-side routing using libraries like React Router.

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});