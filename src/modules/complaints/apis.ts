import { Router } from "express";
import { complaintReqBodyValidation } from "../../middlewares/complaint-req-body-validation";
import { userAuthMiddleware } from "../../middlewares/user-auth";
import {
  postComplaintController,
  getComplaintsController,
} from "./controllers";
import multer from "multer";

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(null, true);
  },
});

const complaintRouter = Router();

complaintRouter.post(
  "/post-user-complaint/:userAuthId/secure",
  userAuthMiddleware,
  upload.single("complaintImage"),
  postComplaintController
);
complaintRouter.get(
  "/get-user-complaints/:userAuthId/secure",
  userAuthMiddleware,
  getComplaintsController
);

export default complaintRouter;
