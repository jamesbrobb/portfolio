import { HttpResponse } from '../response/http-response';
import { HttpRequest } from '../request/http-request';
import {HttpError} from "../error/http-error";


export function isHttpRequest(arg: object): arg is HttpRequest {
    return 'method' in arg && 'url' in arg;
}

export function isHttpResponse(arg: object): arg is HttpResponse {
    return 'status' in arg && (arg as any).status < 400;
}

export function isHttpError(arg: object): arg is HttpError {
    return 'status' in arg && (arg as any).status >= 400;
}
