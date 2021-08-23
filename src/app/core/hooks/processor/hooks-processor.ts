import { Observable } from 'rxjs';
import { Hook } from '../hook';


export type HooksProcessorReturnType<A, B> = B extends void ? Observable<A> : Observable<A | B>;
export type HookBypassCondition<A, B> = (input: A | B) => input is B;


export interface HooksProcessor {

    execute<IOType, BypassType = void>(

        input: IOType | Observable<IOType>,
        hooks: (Hook<IOType> | Hook<IOType, BypassType>)[],
        bypassCondition?: HookBypassCondition<IOType, BypassType>

    ): HooksProcessorReturnType<IOType, BypassType>;
}
