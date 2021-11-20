import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import {Command, CommandGroup, CommandProcessor, CommandTypeTemplate} from "../../commands";

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
    private _hooksProcessor: CommandProcessor;
    private _hooks: Map<string, HttpRequestHook | HttpResponseHook | HttpErrorHook> | undefined;


    constructor(
        methods: Map<string, HttpEndpointMethod>,
        adaptor: HttpAdaptor,
        interpolator: UrlInterpolator,
        hooksProcessor: CommandProcessor,
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
            requestHooks: CommandGroup<HttpRequestHook> = this._getHooks<HttpRequestHook>(method.requestHooks),
            responseHooks: CommandGroup<HttpResponseHook> = this._getHooks<HttpResponseHook>(method.responseHooks),
            errorHooks: CommandGroup<HttpErrorHook> = this._getHooks<HttpErrorHook>(method.errorHooks);

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

    private _getHooks<HookType extends HttpRequestHook | HttpResponseHook | HttpErrorHook>(hookKeys: string[]): HookType[] {

        if(!this._hooks || !hookKeys?.length) {
            return [];
        }

        const hooks = this._hooks,
            hks: HookType[] = hookKeys.map((hookKey: string): HookType => {
                return hooks.get(hookKey) as HookType;
            })

        if(hookKeys.length !== hks.length) {
            throw new Error(`${hookKeys.length} Hook keys specified for endpoint but only ${hks.length} found`);
        }

        return hks;
    }

    private _processRequest(request: HttpRequest, hooks: CommandGroup<HttpRequestHook>): Observable<HttpResponse | HttpError> {

        //hooks.push(this._interpolator);

        return this._hooksProcessor.execute(hooks, request, isHttpResponse)
          .pipe(
            mergeMap((result ) => {

              if(isHttpRequest(result)) {
                return this._adaptor.request(request);
              }

              return of(result);
            })
          );
    }

    private _processResponse(response: HttpResponse, hooks: CommandGroup<HttpResponseHook>): Observable<HttpResponse | HttpError> {

        return this._hooksProcessor.execute(hooks, response, isHttpError)
            .pipe(
                mergeMap((result) => {

                    if(isHttpError(result)) {
                        return throwError(result);
                    }

                    return of(result);
                })
            );
    }

    private _processError(error: HttpError, hooks: CommandGroup<HttpErrorHook>): Observable<HttpError> {

        return this._hooksProcessor.execute(hooks, error)
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
