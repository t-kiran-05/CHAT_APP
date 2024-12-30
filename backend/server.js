// //import path from "path";
// 

// // import messageRoutes from "./routes/message.routes.js";
// const app =express();
// const PORT = process.env.PORT || 5000;
// // import { app, server } from "./socket/socket.js";

// dotenv.config();

// // const __dirname = path.resolve();
// // PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.


// app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
// // 

// app.use("/api/auth", authRoutes);
// // app.use("/api/messages", messageRoutes);

// // app.use(express.static(path.join(__dirname, "/frontend/dist")));

// // app.get("*", (req, res) => {
// // 	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// // });
// // app.get("/", (req, res) => {
// // 	res.send("hello world");
// // });
// app.listen(PORT, () => {
// 	connectToMongoDB();
// 	console.log(`Server Running on port ${PORT}`);
// });

// filepath: /c:/Users/tkiran/Downloads/CHAT_APP/backend/server.js
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

dotenv.config();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); 
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});