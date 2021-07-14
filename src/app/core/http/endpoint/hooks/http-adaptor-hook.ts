import { Observable } from 'rxjs';

import { HttpAdaptor } from '../../adaptor/http-adaptor';
import { HttpError } from '../../error/http-error';
import { HttpRequest } from '../../request/http-request';
import { HttpRequestHook } from '../../request/hook/http-request-hook';
import { HttpResponse } from '../../response/http-response';



export class HttpAdaptorHook implements HttpRequestHook {

    private _adaptor: HttpAdaptor;


    constructor(adaptor: HttpAdaptor) {

        this._adaptor = adaptor;
    }

    public execute(input: HttpRequest): Observable<HttpResponse | HttpError> {

        /*
            @todo - add timeout handling here
         */

        return this._adaptor.request(input);
    }
}
