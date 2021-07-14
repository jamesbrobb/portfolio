import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import {Map} from '../../collection/index';
import {HooksProcessor} from '../../hooks/index';

import { HttpAdaptor } from '../adaptor/http-adaptor';
import { HttpAdaptorHook } from './hooks/http-adaptor-hook';
import { HttpEndpointMethod } from './method/http-endpoint-method';
import { HttpError } from '../error/http-error';
import { HttpErrorHook } from '../error/hook/http-error-hook';
import { HttpRequest } from '../request/http-request';
import { HttpRequestOptions } from '../request/http-request-options';
import { HttpRequestHook } from '../request/hook/http-request-hook';
import { HttpResponse } from '../response/http-response';
import { HttpResponseHook } from '../response/hook/http-response-hook';
import { UrlInterpolator } from '../utils/url/url-interpolator';
import { UrlInterpolatorHook } from './hooks/url-interpolator-hook';
import { isHttpResponse } from '../utils/http-type-guards';



export class HttpEndpoint {

    private _methods: Map<string, HttpEndpointMethod>;
    private _adaptor: HttpAdaptorHook;
    private _interpolator: UrlInterpolatorHook;
    private _hooksProcessor: HooksProcessor;
    private _hooks: Map<string, HttpRequestHook | HttpResponseHook | HttpErrorHook>;


    constructor(
        methods: Map<string, HttpEndpointMethod>,
        adaptor: HttpAdaptor,
        interpolator: UrlInterpolator,
        hooksProcessor: HooksProcessor,
        hooks?: Map<string, HttpRequestHook | HttpResponseHook | HttpErrorHook>
    ) {
        this._methods = methods;
        this._hooksProcessor = hooksProcessor;

        this._adaptor = new HttpAdaptorHook(adaptor);
        this._interpolator = new UrlInterpolatorHook(interpolator);

        this._hooks = hooks;
    }

    public request(
        methodId: string,
        params?: { [key: string]: any },
        options?: HttpRequestOptions

    ): Observable<HttpResponse | HttpError> {

        const method: HttpEndpointMethod = this._getMethodById(methodId),
            request: HttpRequest = method.toRequest(params, options),
            requestHooks: HttpRequestHook[] = this._getHooks<HttpRequestHook>(method.requestHooks),
            responseHooks: HttpResponseHook[] = this._getHooks<HttpResponseHook>(method.responseHooks),
            errorHooks: HttpErrorHook[] = this._getHooks<HttpErrorHook>(method.errorHooks);

        return this._processRequest(request, requestHooks)
            .pipe(mergeMap((response: HttpResponse) => this._processResponse(response, responseHooks)))
            .pipe(catchError((error: HttpError) => this._processError(error, errorHooks)));
    }

    /*public navigate(
        methodId: string,
        params?: {[key: string]: any}
    ): void {
        var method: HttpEndpointMethod = this._getMethodById(methodId),
            request: HttpRequest = method.toRequest(params);

        window.location.href = request.url;
    }*/

    private _getMethodById(id: string): HttpEndpointMethod {

        const method: HttpEndpointMethod = this._methods.get(id);

        if (!method) {
            throw new Error(`There is no registered http method with the id '${id}'`);
        }

        return method;
    }

    private _getHooks<HookType>(hookKeys: string[]): any[] {

        return hookKeys.map((hookKey: string) => {
            return this._hooks.get(hookKey);
        });
    }

    private _processRequest(request: HttpRequest, hooks: HttpRequestHook[]): Observable<HttpResponse | HttpError> {

        hooks.push(this._interpolator, this._adaptor);

        return this._hooksProcessor.execute<HttpRequest, HttpResponse | HttpError>(request, hooks, isHttpResponse);
    }

    private _processResponse(response: HttpResponse, hooks: HttpResponseHook[]): Observable<HttpResponse | HttpError> {

        return this._hooksProcessor.execute<HttpResponse, HttpResponse | HttpError>(response, hooks);
    }

    private _processError(error: HttpError, hooks: HttpErrorHook[]): Observable<HttpError> {

        return this._hooksProcessor.execute<HttpError>(error, hooks)
            .pipe(mergeMap((output: HttpError) => {

                if (output.status < 400) {
                    return of(output);
                }

                return throwError(output);
            }));
    }
}
