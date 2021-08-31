import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import {HooksProcessor} from '../../hooks';

import { HttpAdaptor } from '../adaptor/http-adaptor';
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
import {isHttpError, isHttpRequest, isHttpResponse} from '../utils/http-type-guards';



export class HttpEndpoint {

    private _methods: Map<string, HttpEndpointMethod>;
    private _adaptor: HttpAdaptor;
    private _interpolator: UrlInterpolatorHook;
    private _hooksProcessor: HooksProcessor;
    private _hooks: Map<string, HttpRequestHook | HttpResponseHook | HttpErrorHook> | undefined;


    constructor(
        methods: Map<string, HttpEndpointMethod>,
        adaptor: HttpAdaptor,
        interpolator: UrlInterpolator,
        hooksProcessor: HooksProcessor,
        hooks?: Map<string, HttpRequestHook | HttpResponseHook | HttpErrorHook>
    ) {
        this._methods = methods;
        this._hooksProcessor = hooksProcessor;

        this._adaptor = adaptor;
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

    private _getMethodById(id: string): HttpEndpointMethod {

        const method: HttpEndpointMethod | undefined = this._methods.get(id);

        if (!method) {
            throw new Error(`There is no registered http method with the id '${id}'`);
        }

        return method;
    }

    private _getHooks<HookType>(hookKeys: string[]): HookType[] {

        if(!hookKeys?.length) {
            return [];
        }

        const hooks: HookType[] = hookKeys.map((hookKey: string) => {
            return this._hooks?.get(hookKey);
        }) as unknown as HookType[];

        if(hookKeys.length !== hooks?.length) {
            throw new Error(`${hookKeys.length} Hook keys specified for endpoint but only ${hooks?.length} found`);
        }

        return hooks;
    }

    private _processRequest(request: HttpRequest, hooks: HttpRequestHook[]): Observable<HttpResponse | HttpError> {

        hooks.push(this._interpolator);

        return this._hooksProcessor.execute<HttpRequest, HttpResponse | HttpError>(request, hooks, isHttpResponse)
          .pipe(
            mergeMap((result ) => {

              if(isHttpRequest(result)) {
                return this._adaptor.request(request);
              }

              return of(result);
            })
          );
    }

    private _processResponse(response: HttpResponse, hooks: HttpResponseHook[]): Observable<HttpResponse | HttpError> {

        return this._hooksProcessor.execute<HttpResponse, HttpError>(response, hooks, isHttpError)
            .pipe(
                mergeMap((result) => {

                    if(isHttpError(result)) {
                        return throwError(result);
                    }

                    return of(result);
                })
            );
    }

    private _processError(error: HttpError, hooks: HttpErrorHook[]): Observable<HttpError> {

        return this._hooksProcessor.execute<HttpError>(error, hooks)
            .pipe(
                mergeMap((output: HttpError) => {

                    if (isHttpResponse(output)) {
                        return of(output);
                    }

                    return throwError(output);
                })
            );
    }
}
