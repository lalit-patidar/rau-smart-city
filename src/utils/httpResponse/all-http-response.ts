import { appConstants } from "../../config/app-constants/constants";

const {
  httpCode: {
    OK,
    created,
    badRequest,
    notFound,
    forbidden,
    unproccessed,
    internalServer,
  },
} = appConstants;

export interface Properties {
  status: number;
  message: string;
  body: any;
  errors: any;
}

class HttpResponse implements Properties {
  status: number;
  message: string = "";
  body: any = {};
  errors: any = {};

  constructor(status: any, message: any, body: any, errors: any) {
    this.status = status;
    this.message = message;
    if (body) {
      this.body = body;
    }
    this.errors = errors || [];
  }

  static created(body: any, err: any) {
    return new HttpResponse(created[0], created[1], body, err);
  }

  static OK(body: any, err: any) {
    return new HttpResponse(OK[0], OK[1], body, err);
  }

  // Http error responses
  static badRequest(error: any) {
    return new HttpResponse(badRequest[0], badRequest[1], null, error);
  }

  static notFound(error: any) {
    return new HttpResponse(notFound[0], notFound[1], null, error);
  }

  static internalServer(error: any) {
    return new HttpResponse(internalServer[0], internalServer[1], null, error);
  }

  // 403 forbidden - indicates that the server understands the request but refuses to authorize it
  static forbidden(error: any) {
    return new HttpResponse(forbidden[0], forbidden[1], null, error);
  }

  static unProcessd(error: any) {
    return new HttpResponse(unproccessed[0], unproccessed[1], null, error);
  }
}

export default HttpResponse;
