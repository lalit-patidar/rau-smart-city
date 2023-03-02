import { complaintInstance } from "./services";
import HttpResponse from "../../utils/httpResponse/all-http-response";
import traceAndThrowError from "../../utils/errorHandling/custom-error";
import { Request, Response, NextFunction } from "express";
import sharp from 'sharp'

const postComplaintController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    //@ts-ignore
    req.user.avatar = buffer;
    console.log(buffer.toString("base64"));
    
    //@ts-ignore
    const { message, complaintId } = await complaintInstance.postCompalint({
      //@ts-ignore
      newComplaint: req.body,
      //@ts-ignore
      user: req.user,
      postImage: buffer
    });
    const responseBody = HttpResponse.created({ message, complaintId }, null);
    res.send(responseBody);
  } catch (error) {
    const mappedError = traceAndThrowError(error);
    delete mappedError.body;
    next(mappedError);
  }
};

const getComplaintsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const  resStream  = await complaintInstance.getCompalint({
      //@ts-ignore
      user: req.user,
      limit: req.query.limit,
      skip: req.query.skip,
    });
    // const responseBody = HttpResponse.OK({ resStream }, null);
    // res.send(responseBody);
    //@ts-ignore
   resStream.Body.pipe(res)

  } catch (error) {
    const mappedError = traceAndThrowError(error);
    delete mappedError.body;
    next(mappedError);
  }
};

export { postComplaintController, getComplaintsController };


