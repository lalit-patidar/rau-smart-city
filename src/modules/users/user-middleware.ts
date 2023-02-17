import jwt from "jsonwebtoken";
import User from "./user-model";
// import ApiError from "../ErrorHandling/apiError";
import {APP_CONFIG} from "../../config/app-config"
import { NextFunction, Request, Response } from "express";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded:any = jwt.verify(token, APP_CONFIG.JWT_USER);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    //@ts-ignore
    req.token = token;
    //@ts-ignore
    req.user = user;
    next();
  } catch (e) {
    next(ApiError.notFound("please authenticate"));
  }
};

module.exports = userAuth;