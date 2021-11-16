import {Command} from "../../../commands";
import { HttpError } from '../../error/http-error';
import { HttpRequest } from '../http-request';
import { HttpResponse } from '../../response/http-response';


export interface HttpRequestHook extends Command<HttpRequest, HttpRequest | HttpResponse | HttpError> {}
