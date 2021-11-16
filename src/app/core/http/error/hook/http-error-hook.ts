import {HttpError} from '../http-error';
import {Command} from "../../../commands";


export interface HttpErrorHook extends Command<HttpError> {}
