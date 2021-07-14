import {Hook} from '../../../hooks/index';
import {HttpError} from '../http-error';


export interface HttpErrorHook extends Hook<HttpError, HttpError> {}
