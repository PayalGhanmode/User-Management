import express from "express";
import cors from "cors";
const app = express();
import path from 'path'; 

import userRouter from "./routes/userRoute";
import authRouter from "./routes/authRoute"

app.use(express.json());
app.use(cors({ origin: "*" }));


app.use("/api", userRouter);
app.use("/api", authRouter)
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));

export default app;
