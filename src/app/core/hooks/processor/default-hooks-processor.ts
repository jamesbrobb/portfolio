import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {Hook} from '../hook';

import {
  HooksProcessor,
  HooksProcessorReturnType,
  HooksProcessorHooksArgType,
  HooksProcessorBypassConditionArgType
} from './hooks-processor';

import {HookMap} from "../group/hook-map";



export class DefaultHooksProcessor implements HooksProcessor {


    public execute<IOType, BypassType = void>(

        input: IOType | Observable<IOType>,
        hooks: HooksProcessorHooksArgType<IOType, BypassType>,
        ...args: HooksProcessorBypassConditionArgType<IOType, BypassType>

    ): HooksProcessorReturnType<IOType, BypassType> {

        const initialValue: Observable<IOType> = input instanceof Observable ? input : of(input),
          bypassCondition = args[0];
        return initialValue;
        /*return hooks.reduce(

          (observable: Observable<IOType | BypassType>, hook: Hook<IOType> | Hook<IOType, BypassType>): HooksProcessorReturnType<IOType, BypassType> => {

            return observable.pipe(
              mergeMap(
                (inpt: IOType | BypassType) => {

                  if(bypassCondition?.(inpt)) {
                      return of(inpt);
                  }

                  const result = hook.execute(inpt as IOType);

                  return result instanceof Observable ? result : of(result);
                })
            )

          }, initialValue);*/
    }
}


/*export class HookProcessor2 {

    public execute<IOType, BypassType = void>(

        input: IOType | Observable<IOType>,
        hookMap: HookMap<IOType, BypassType>,
        ...args: HooksProcessorBypassConditionArgType<IOType, BypassType>

    ): HooksProcessorReturnType<IOType, BypassType> {

        const initialValue: Observable<IOType> = input instanceof Observable ? input : of(input),
            bypassCondition = args[0],
            hooks = hookMap.getHooks();

        return hooks.reduce(

            (observable: Observable<IOType | BypassType>,
             hook: Hook<IOType> | Hook<IOType, BypassType>): HooksProcessorReturnType<IOType, BypassType> => {

                return observable.pipe(
                    mergeMap(
                        (inpt: IOType | BypassType) => {

                        if(bypassCondition?.(inpt)) {
                            return of(inpt);
                        }

                        const result = hook.execute(inpt as IOType);

                    return result instanceof Observable ? result : of(result);
              })
            );

        }, initialValue);
  }
}*/
