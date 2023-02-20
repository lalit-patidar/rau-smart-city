import {Router} from "express";
import { complaintReqBodyValidation } from "../../middlewares/complaint-req-body-validation";
import { userAuthMiddleware } from "../../middlewares/user-auth";
import {postComplaintController, getComplaintsController} from "./controllers";

const complaintRouter =  Router();

complaintRouter.post("/post-user-complaint/:userAuthId/secure",complaintReqBodyValidation, userAuthMiddleware, postComplaintController);
complaintRouter.get("/get-user-complaints/:userAuthId/secure", userAuthMiddleware, getComplaintsController);

export default complaintRouter;
 