import { UserCreadentialServicesInstance }  from "./user-services";
import HttpResponse  from "../../utils/httpResponse/all-http-response";
import traceAndThrowError  from "../../utils/errorHandling/custom-error";
import {Request, Response, NextFunction} from "express"

const signupUserController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      console.log('signup is hiting')
    //@ts-ignore
      const {sessionId, token} = await UserCreadentialServicesInstance.createUser(req.validatedBody);
      const responseBody = HttpResponse.created({sessionId, token}, null);
      res.send(responseBody);
   } catch (error) {
      const mappedError = traceAndThrowError(error);
      delete mappedError.body;
      next(mappedError);   
   }
};

const confirmNewUserController = async (req: Request, res: Response, next: NextFunction) => {
   console.log('confirm is hiting')
   try {
    //@ts-ignore
      const { user, token } = await UserCreadentialServicesInstance.confirmUser(req.validatedBody, req.user, req.validatedBody.type);
      const responseBody = HttpResponse.OK({ user, token }, null);
      res.send(responseBody)
   } catch (error) {
      const mappedError = traceAndThrowError(error);
      delete mappedError.body;
      next(mappedError); 
   }
};

const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
   console.log('login is hiting')
   try {
    //@ts-ignore
      const { sessionId, token } = await UserCreadentialServicesInstance.loginUser(req.validatedBody);
      const responseBody = HttpResponse.OK({ sessionId, token }, null);
      res.send(responseBody)
   } catch (error) {
      const mappedError = traceAndThrowError(error);
      delete mappedError.body;
      next(mappedError); 
   }
};

const updateUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
   try {
     //@ts-ignore
     const user = await UserCreadentialServicesInstance.updateUser(req.validatedBody, req.user);
     //@ts-ignore
     const responseBody = HttpResponse.OK();
     res.send(responseBody)
   } catch (error) {
      console.log(error)
      const mappedError = traceAndThrowError(error);
      delete mappedError.body;
      next(mappedError);
   }
};


const logoutUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
   try {
    //@ts-ignore
       await UserCreadentialServicesInstance.logoutUser(req.user, req.token);
      const responseBody = HttpResponse.OK({message: "You are now logout"}, null);
      res.send(responseBody);
   } catch (error) {
      const mappedError = traceAndThrowError(error);
      delete mappedError.body;
      next(mappedError);
   }
};

export {
   signupUserController,
   loginUserController,
   updateUserProfileController,
   logoutUserProfileController,
   confirmNewUserController
}