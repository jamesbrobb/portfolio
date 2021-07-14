import { Hook } from '../../../hooks/index';

import { HttpError } from '../../error/http-error';
import { HttpRequest } from '../http-request';
import { HttpResponse } from '../../response/http-response';



export interface HttpRequestHook extends Hook<HttpRequest, HttpRequest | HttpResponse | HttpError> {}
