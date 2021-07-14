/*
    HttpEndpoint integration tests
 */

import Spy = jasmine.Spy;
import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Map} from '../../collection/index';

import {MockErrorHook, MockHttpAdaptor, mockHttpConfig, MockRequestHook, MockResponseHook} from '../http.mock';

import {DefaultHooksProcessor, HooksProcessor} from '../../hooks/index';

import { DefaultUrlInterpolator } from '../utils/url/default-url-interpolator';
import { HttpAdaptor } from '../adaptor/http-adaptor';
import { HttpEndpoint } from './http-endpoint';
import { HttpEndpointConfigParser } from './config/parser/http-endpoint-config-parser';
import { HttpEndpointMethod } from './method/http-endpoint-method';
import { HttpError } from '../error/http-error';
import { HttpErrorHook } from '../error/hook/http-error-hook';
import { HttpHeaders } from '../headers/http-headers';
import { HttpRequest } from '../request/http-request';
import { HttpRequestHook } from '../request/hook/http-request-hook';
import { HttpRequestOptions } from '../request/http-request-options';
import { HttpResponse } from '../response/http-response';
import { HttpResponseHook } from '../response/hook/http-response-hook';
import { UrlInterpolator } from '../utils/url/url-interpolator';


describe('HttpEndpoint', () => {

    let parser: HttpEndpointConfigParser,
        requestHookMap: Map<string, HttpRequestHook>,
        responseHookMap: Map<string, HttpResponseHook>,
        errorHookMap: Map<string, HttpErrorHook>,
        methods: Map<string, HttpEndpointMethod>,
        adaptor: HttpAdaptor,
        interpolator: UrlInterpolator,
        hooksProcessor: HooksProcessor,
        endpoint: HttpEndpoint,
        hooks: Map<string, HttpRequestHook | HttpResponseHook | HttpErrorHook>;

    let mockResponse: HttpResponse,
        mockError: HttpError;

    function createHookMaps() {

        requestHookMap = new Map<string, HttpRequestHook>();
        responseHookMap = new Map<string, HttpResponseHook>();
        errorHookMap = new Map<string, HttpErrorHook>();
    }

    function populateMapsWithConcreteHooks(requestResponse ?: HttpResponse | HttpError, responseError ?: HttpError) {

        hooks = new Map();

        hooks.set('mainRequestHook', new MockRequestHook(requestResponse));
        hooks.set('methodRequestHook', new MockRequestHook());
        hooks.set('mainResponseHook', new MockResponseHook(responseError));
        hooks.set('methodResponseHook', new MockResponseHook());
        hooks.set('mainErrorHook', new MockErrorHook());
        hooks.set('methodErrorHook', new MockErrorHook());
    }

    function createParser() {
        parser = new HttpEndpointConfigParser();
    }

    function parseConfig() {
        methods = parser.parse(mockHttpConfig);
    }

    function createEndpoint(response: HttpResponse | HttpError) {

        adaptor = new MockHttpAdaptor(response);
        interpolator = new DefaultUrlInterpolator();
        hooksProcessor = new DefaultHooksProcessor();

        endpoint = new HttpEndpoint(methods, adaptor, interpolator, hooksProcessor, hooks);
    }

    function setUp(
        response: HttpResponse | HttpError,
        requestHookResponse ?: HttpResponse | HttpError,
        responseHookError ?: HttpError
    ) {
        createHookMaps();
        populateMapsWithConcreteHooks(requestHookResponse, responseHookError);
        createParser();
        parseConfig();
        createEndpoint(response);
    }

    beforeEach(() => {

        mockResponse = {
            status: 200,
            statusText: 'status text',
            data: {},
            headers: new HttpHeaders(),
            request: null
        };

        mockError = {
            status: 500,
            statusText: 'status text',
            data: {},
            headers: new HttpHeaders(),
            request: null
        };
    });

    describe('request creation', () => {

        it('errores if the supplied method id does not exist', () => {

            const methodId = 'noSuchMethod';

            setUp(mockResponse);

            expect(() => {

                endpoint.request(methodId)
                    .subscribe();

            }).toThrow();
        });

        it('makes a request with the expected HttpEndpointMethod properties', (done: Function) => {

            setUp(mockResponse);

            endpoint.request('create')
                .subscribe((response: HttpResponse) => {

                    const request: HttpRequest = response.request,
                        headers: HttpHeaders = request.headers;

                    expect(request.search).toEqual({
                        field1: 'field1',
                        field2: 'field2',
                    });

                    expect(request.method).toBe('POST');
                    expect(request.data).toBeUndefined();
                    expect(request.withCredentials).toEqual(true);
                    expect(request.cache).toEqual(true);
                    expect(request.timeout).toBeUndefined();

                    expect(headers.get('Accept')).toEqual('application/json');
                    expect(headers.get('Cache-control')).toEqual('no-cache');

                    done();
                });
        });

        it('overwrites the request params with the supplied options', (done: Function) => {

            const requestOptions: HttpRequestOptions = {

                search: {
                    test1: 'test1',
                    field2: 'overwritten'
                },
                data: {
                    field: true
                },
                headers: new HttpHeaders({
                    'Cache-control': 'max-age=0'
                }),
                withCredentials: false,
                cache: false,
                timeout: 1000
            };

            setUp(mockResponse);

            endpoint.request('create', undefined, requestOptions)
                .subscribe((response: HttpResponse) => {

                    const request: HttpRequest = response.request,
                        headers: HttpHeaders = request.headers;

                    expect(request.search).toEqual({
                        field1: 'field1',
                        field2: 'overwritten',
                        test1: 'test1'
                    });

                    expect(request.data).toEqual({
                        field: true
                    });
                    expect(request.withCredentials).toEqual(false);
                    expect(request.cache).toEqual(false);
                    expect(request.timeout).toEqual(1000);

                    expect(headers.get('Accept')).toEqual('application/json');
                    expect(headers.get('Cache-control')).toEqual('max-age=0');

                    done();
                });
        });
    });

    describe('request hook phase', () => {

        let methodId: string,
            method: HttpEndpointMethod,
            hookSpys: Spy[],
            adaptorSpy: Spy,
            interpolatorSpy: Spy;

        function setUpHookSpys() {

            methodId = 'create';
            method = methods.get(methodId);

            hookSpys = method.requestHooks
                .map((key: string) => hooks.get(key))
                .map((hook: HttpRequestHook) => spyOn<any>(hook, 'execute').and.callThrough());
        }

        function setUpSpys() {

            adaptorSpy = spyOn(adaptor, 'request').and.callThrough();
            interpolatorSpy = spyOn(interpolator, 'interpolate').and.callThrough();
        }

        it('processes the request hooks', (done: Function) => {

            setUp(mockResponse);
            setUpHookSpys();

            endpoint.request(methodId)
                .subscribe((response: HttpResponse) => {

                    hookSpys.forEach((spy: Spy) => {
                        expect(spy).toHaveBeenCalledWith(response.request);
                    });

                    done();
                });
        });

        it('interpolate the url with the supplied params', (done: Function) => {

            setUp(mockResponse);

            endpoint.request('getById', {
                id: 5
            })
                .subscribe((response: HttpResponse) => {
                    expect(response.request.url).toBe('api/5/');
                    done();
                });
        });

        it('calls the HttpAdaptor once the url has been interpolated', (done: Function) => {

            setUp(mockResponse);
            setUpSpys();

            endpoint.request('getById', {
                id: 5
            })
                .subscribe((response: HttpResponse) => {

                    const request: HttpRequest = adaptorSpy.calls.argsFor(0)[0];

                    expect(request.url).toBe('api/5/');
                    expect(request.method).toBe('GET');
                    expect(request.data).toBeUndefined();
                    expect(request.withCredentials).toEqual(true);
                    expect(request.cache).toEqual(true);
                    expect(request.timeout).toBeUndefined();

                    done();
                });
        });

        it('bypasses any remaining hooks if an HttpResponse is returned during the phase', (done: Function) => {

            const interuptResponse: HttpResponse = {
                status: 200,
                statusText: 'interupt response',
                data: {},
                headers: new HttpHeaders(),
                request: null
            };

            setUp(mockResponse, interuptResponse);
            setUpHookSpys();
            setUpSpys();

            endpoint.request(methodId)
                .subscribe((response: HttpResponse) => {

                    expect(hookSpys.reduce((count: number, spy: Spy) => {
                        return spy.calls.count() + count;
                    }, 0)).toEqual(1);

                    expect(adaptorSpy).not.toHaveBeenCalled();
                    expect(interpolatorSpy).not.toHaveBeenCalled();

                    expect(response).not.toBe(mockResponse);
                    expect(response).toBe(interuptResponse);

                    done();
                });
        });

        it('bypasses any remaining hooks if an HttpError is returned during the phase', (done: Function) => {

            setUp(mockResponse, mockError);
            setUpHookSpys();
            setUpSpys();

            endpoint.request(methodId)
                .pipe(catchError((error: HttpError) => {

                    expect(hookSpys.reduce((count: number, spy: Spy) => {
                        return spy.calls.count() + count;
                    }, 0)).toEqual(1);

                    expect(adaptorSpy).not.toHaveBeenCalled();
                    expect(interpolatorSpy).not.toHaveBeenCalled();

                    expect(error).not.toBe(mockResponse);
                    expect(error).toBe(mockError);

                    done();

                    return of(error);
                }))
                .subscribe();
        });
    });

    describe('response hooks phase', () => {

        let methodId: string,
            method: HttpEndpointMethod,
            hookSpys: Spy[];

        function setUpHookSpys() {

            methodId = 'create';
            method = methods.get(methodId);

            hookSpys = method.responseHooks
                .map((key: string) => hooks.get(key))
                .map((hook: HttpResponseHook) => spyOn<any>(hook, 'execute').and.callThrough());
        }

        it('processes the response hooks', (done: Function) => {

            setUp(mockResponse);
            setUpHookSpys();

            endpoint.request(methodId)
                .subscribe((response: HttpResponse) => {

                    hookSpys.forEach((spy: Spy) => {
                        expect(spy).toHaveBeenCalledWith(response);
                    });

                    done();
                });
        });

        it('bypasses any remaining hooks if an HttpError is returned during the phase', (done: Function) => {

            setUp(mockResponse, null, mockError);
            setUpHookSpys();

            endpoint.request(methodId)
                .pipe(catchError((error: HttpError) => {

                    expect(hookSpys.reduce((count: number, spy: Spy) => {
                        return spy.calls.count() + count;
                    }, 0)).toEqual(1);

                    expect(error).not.toBe(mockResponse);
                    expect(error).toBe(mockError);

                    done();

                    return of(error);
                }))
                .subscribe();
        });

        it('bypasses this phase in its entirety if an HttpError is returned during the request phase', (done: Function) => {

            setUp(mockError);
            setUpHookSpys();

            endpoint.request(methodId)
                .pipe(catchError((error: HttpError) => {

                    expect(hookSpys.reduce((count: number, spy: Spy) => {
                        return spy.calls.count() + count;
                    }, 0)).toEqual(0);

                    expect(error).not.toBe(mockResponse);
                    expect(error).toBe(mockError);

                    done();

                    return of(error);
                }))
                .subscribe();
        });
    });

    describe('error hook phase', () => {

        let methodId: string,
            method: HttpEndpointMethod,
            hookSpys: Spy[];

        function setUpHookSpys() {

            methodId = 'create';
            method = methods.get(methodId);

            hookSpys = method.errorHooks
                .map((key: string) => hooks.get(key))
                .map((hook: HttpErrorHook) => spyOn<any>(hook, 'execute').and.callThrough());
        }

        it('processes the error hooks when an error occurs in the request phase', (done: Function) => {

            setUp(mockError);
            setUpHookSpys();

            endpoint.request(methodId)
                .pipe(catchError((error: HttpError) => {

                    hookSpys.forEach((spy: Spy) => {
                        expect(spy).toHaveBeenCalledWith(error);
                    });

                    done();

                    return of(error);
                }))
                .subscribe();
        });

        it('processes the error hooks when an error occurs in the response phase', (done: Function) => {

            setUp(mockResponse, null, mockError);
            setUpHookSpys();

            endpoint.request(methodId)
                .pipe(catchError((error: HttpError) => {

                    hookSpys.forEach((spy: Spy) => {
                        expect(spy).toHaveBeenCalledWith(error);
                    });

                    done();

                    return of(error);
                }))
                .subscribe();
        });

        it('forward the error to any subscribers - ensure the internally caught error is re-thrown', (done: Function) => {

            setUp(mockError);

            endpoint.request(methodId)
                .subscribe(
                    () => {
                    },
                    (error: HttpError) => {

                        expect(error).toBe(mockError);
                        done();
                    }
                );
        });

        it('does not process the error hooks if no error occurs', (done: Function) => {

            setUp(mockResponse);
            setUpHookSpys();

            endpoint.request(methodId)
                .subscribe(() => {

                    hookSpys.forEach((spy: Spy) => {
                        expect(spy).not.toHaveBeenCalled();
                    });

                    done();
                });
        });
    });
});
