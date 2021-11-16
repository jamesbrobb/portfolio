import {Command} from "../../../commands";
import { HttpError } from '../../error/http-error';
import { HttpResponse } from '../http-response';


export interface HttpResponseHook extends Command<HttpResponse, HttpResponse | HttpError> { }
