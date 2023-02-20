import { complaintInstance }  from "./services";
import HttpResponse  from "../../utils/httpResponse/all-http-response";
import traceAndThrowError  from "../../utils/errorHandling/custom-error";
import {Request, Response, NextFunction} from "express"

const postComplaintController = async (req: Request, res: Response, next: NextFunction) => {
   try {
    //@ts-ignore
    console.log("req..", req.validatedBody)
    //@ts-ignore
      const {message, complaintId} = await complaintInstance.postCompalint({newComplaint: req.validatedBody, user: req.user});
      const responseBody = HttpResponse.created({message, complaintId}, null);
      res.send(responseBody);
   } catch (error) {
      const mappedError = traceAndThrowError(error);
      delete mappedError.body;
      next(mappedError);   
   }
};

const getComplaintsController = async (req: Request, res: Response, next: NextFunction) => {
   try {
    //@ts-ignore
      const { user } = await complaintInstance.getCompalint({user: req.user, limit: req.query.limit, skip: req.query.skip});
      const responseBody = HttpResponse.OK({ user }, null);
      res.send(responseBody)
   } catch (error) {
      const mappedError = traceAndThrowError(error);
      delete mappedError.body;
      next(mappedError); 
   }
};

export {
   postComplaintController,
   getComplaintsController
}