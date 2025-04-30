import express from "express";
import { registerUser, userLogin ,getAllauth, getPeginatedData, getRegisterUserById, updateUser, googleLogin,changePassword, forgotPassword} from "../controllers/authController";
//import {verifytoken} from "../helpers/middalware"
import { uploadMiddleware } from "../helpers/multer";
import { verifToken } from "../helpers/middalware";

const authRouter = express.Router();

authRouter.post("/signup", uploadMiddleware.single("profile"), registerUser);
authRouter.post("/login", userLogin);
authRouter.get("/auth", getAllauth); 
authRouter.get("/pagination", verifToken , getPeginatedData);
authRouter.get('/getuser/:id', verifToken,  getRegisterUserById);
authRouter.put("/update/:id", verifToken, uploadMiddleware.single("profile") , updateUser);
authRouter.post("/google-login", googleLogin)
authRouter.put('/user/change-password/:id', changePassword);
authRouter.post("/forgot-password", forgotPassword)


export default authRouter;
