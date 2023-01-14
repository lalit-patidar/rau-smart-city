import {Router} from "express";
import {signupUserController, loginUserController, updateUserProfileController, deleteUserProfileController} from "./user-controller";
const adminAuth = require("../../middlewares/admin/admin-auth");
const adminReqBodyAuth = require("../../middlewares/admin/admin-body-validation");

export const userRouter =  Router();

userRouter.post("/signup-admin/:id/secure", userReqBodyAuth, signupUserController);
userRouter.post("/login-admin/:id/secure", userReqBodyAuth, loginUserController);
userRouter.patch("/update-admin/:id/secure", userReqBodyAuth, userAuthMiddleware, updateUserProfileController);
userRouter.delete("/remove-admin/:id/secure", userReqBodyAuth, userAuthMiddleware, deleteUserProfileController);
