import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {Hook} from '../hook';
import {HooksProcessor, HookBypassCondition, HooksProcessorReturnType} from './hooks-processor';



export class DefaultHooksProcessor implements HooksProcessor {


    public execute<IOType, BypassType = void>(

        input: IOType | Observable<IOType>,
        hooks: Hook<IOType, BypassType>[],
        bypassCondition?: HookBypassCondition<IOType | BypassType>

    ): HooksProcessorReturnType<IOType, BypassType> {

        /*
          if BypassType != void and no bypassCondition supplied throw error
         */

        const initialValue: Observable<IOType> = input instanceof Observable ? input : of(input);

        return hooks.reduce(

          (observable: Observable<IOType | BypassType>, hook: Hook<IOType, BypassType>) => {

            return observable.pipe(
              mergeMap(
                (inpt: IOType | BypassType) => {
                  return this._executeHook<IOType, BypassType>(inpt, hook, bypassCondition)
                })
            );

          }, initialValue) as HooksProcessorReturnType<IOType, BypassType>;
    }

    private _executeHook<IOType, BypassType>(
        input: IOType | BypassType,
        hook: Hook<IOType, BypassType>,
        bypassCondition?: HookBypassCondition<IOType | BypassType>

    ): Observable<IOType | BypassType> {

        let result: IOType | BypassType |Observable<IOType | BypassType>;

        if (this._shouldBypass<IOType, BypassType>(input, bypassCondition)) {

            return of(input);
        }

        result = hook.execute(input);

        return result instanceof Observable ? result : of(result);
    }

    private _shouldBypass<IOType, BypassType>(
        input: IOType | BypassType,
        bypassCondition?: HookBypassCondition<IOType | BypassType>

    ): input is BypassType {

        const shouldBypass: boolean | undefined = bypassCondition?.(input);

        return !!shouldBypass;
    }
}
