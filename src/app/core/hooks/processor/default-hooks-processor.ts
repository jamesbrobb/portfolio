import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {Hook} from '../hook';
import {HooksProcessor, HookBypassCondition} from './hooks-processor';



export class DefaultHooksProcessor implements HooksProcessor {


    public execute<I, O = I>(
        input: I|Observable<I>,
        hooks: Hook<I, I|O>[],
        bypassCondition?: HookBypassCondition<I|O>

    ): Observable<any> {

        if (!(input instanceof Observable)) {
            input = of(input);
        }

        return hooks.reduce<Observable<I|O>>((observable: Observable<I|O>, hook: Hook<I, I|O>) => {

            return observable.pipe(mergeMap((inpt: I|O) => this._executeHook<I, O>(inpt, hook, bypassCondition)));

        }, input) as Observable<any>;
    }

    private _executeHook<I, O>(
        input: I|O,
        hook: Hook<I, I|O>,
        bypassCondition?: HookBypassCondition<I|O>

    ): Observable<I|O> {

        let result: I|O|Observable<I|O>;

        if (this._shouldBypass<I, O>(input, bypassCondition)) {

            return of(input);
        }

        result = hook.execute(input);

        return result instanceof Observable ? result : of(result);
    }

    private _shouldBypass<I, O>(
        input: I|O,
        bypassCondition?: HookBypassCondition<I|O>

    ): input is O {

        return bypassCondition && bypassCondition(input);
    }
}
