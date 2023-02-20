import {Router} from "express";
import { userReqBodyValidation } from "../../middlewares/request-body-validation";
import { userAuthMiddleware } from "../../middlewares/user-auth";
import {signupUserController, loginUserController, updateUserProfileController, confirmNewUserController} from "./user-controller";

const userRouter =  Router();

userRouter.post("/signup-user/:userAuthId/secure", userReqBodyValidation, signupUserController);
userRouter.post("/confirm-user/:userAuthId/secure",userReqBodyValidation, userAuthMiddleware, confirmNewUserController);
userRouter.post("/login-user/:userAuthId/secure", userReqBodyValidation, loginUserController);
userRouter.patch("/update-user/:userAuthId/secure", userReqBodyValidation, userAuthMiddleware, updateUserProfileController);

export default userRouter;
