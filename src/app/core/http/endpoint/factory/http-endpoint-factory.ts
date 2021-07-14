import { Map } from '../../../collection/index';
import { DefaultHooksProcessor, HooksProcessor } from '../../../hooks/index';

import { DefaultUrlInterpolator } from '../../utils/url/default-url-interpolator';
import { HttpAdaptor } from '../../adaptor/http-adaptor';
import { HttpEndpoint } from '../http-endpoint';
import { HttpEndpointConfig } from '../config/http-endpoint-config';
import { HttpEndpointConfigParser } from '../config/parser/http-endpoint-config-parser';
import { HttpEndpointMethod } from '../method/http-endpoint-method';
import { UrlInterpolator } from '../../utils/url/url-interpolator';
import { HttpRequestHook } from '../../request/hook/http-request-hook';
import { HttpResponseHook } from '../../response/hook/http-response-hook';
import { HttpErrorHook } from '../../error/hook/http-error-hook';



export class HttpEndpointFactoryHooksMap extends Map<string, HttpRequestHook | HttpResponseHook | HttpErrorHook> {}


export interface HttpEndpointsConfig {
    [endpoint: string]: HttpEndpointConfig;
}

export interface HttpEndpointFactoryParams {
    adaptor: HttpAdaptor;
    config?: HttpEndpointsConfig;
    hooks?: HttpEndpointFactoryHooksMap;
    parser?: HttpEndpointConfigParser;
    interpolator?: UrlInterpolator;
    processor?: HooksProcessor;
}


export class HttpEndpointFactory {

    private _config: HttpEndpointsConfig;
    private _adaptor: HttpAdaptor;
    private _interpolator: UrlInterpolator;
    private _parser: HttpEndpointConfigParser;
    private _hookProcessor: HooksProcessor;
    private _hooks: HttpEndpointFactoryHooksMap;


    constructor(params: HttpEndpointFactoryParams) {
        this._config = params.config;
        this._adaptor = params.adaptor;
        this._hooks = params.hooks;
        this._parser = params.parser || new HttpEndpointConfigParser();
        this._interpolator = params.interpolator || new DefaultUrlInterpolator();
        this._hookProcessor = params.processor || new DefaultHooksProcessor();
    }

    public create(config: HttpEndpointConfig): HttpEndpoint {

        const methods: Map <string, HttpEndpointMethod> = this._parser.parse(config);

        return new HttpEndpoint(methods, this._adaptor, this._interpolator, this._hookProcessor, this._hooks);
    }

    public createByType(endpointType: string): HttpEndpoint {

        if (!this._config) {
            throw new Error('HttpEndpointFactory:createByType:: no config supplied');
        }

        if (!this._config[endpointType]) {
            throw new Error(`HttpEndpointFactory:createByType:: no config supplied for endpointType ${endpointType}`);
        }

        return this.create(this._config[endpointType]);
    }
}
