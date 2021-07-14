import { Hook } from '../../../hooks/index';

import { HttpError } from '../../error/http-error';
import { HttpResponse } from '../http-response';

export interface HttpResponseHook extends Hook<HttpResponse, HttpResponse | HttpError> { }
