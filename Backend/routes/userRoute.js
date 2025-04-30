import express from "express";
import { createUser, getUsersbyid, getUSersData, importUsers, exportUsers } from "../controllers/userController";
import { verifToken } from "../helpers/middalware";

const userRouter = express.Router();

userRouter.post("/createusers", verifToken, createUser);
userRouter.get("/fetchusers/:id", verifToken, getUsersbyid);
userRouter.get("/getuserdatafinal", verifToken, getUSersData);
userRouter.get('/export', verifToken, exportUsers);
userRouter.post('/import/:id', importUsers);

export default userRouter;
