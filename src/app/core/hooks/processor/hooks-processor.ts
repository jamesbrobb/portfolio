import { Observable } from 'rxjs';
import { Hook } from '../hook';


export type HooksProcessorReturnType<A, B> = B extends void ? Observable<A> : Observable<A | B>;

export type HookBypassCondition<I> = (input: I) => boolean;


export interface HooksProcessor {

    execute<IOType, BypassType = void>(

        input: IOType | Observable<IOType>,
        hooks: Hook<IOType, BypassType>[],
        bypassCondition?: HookBypassCondition<IOType | BypassType>

    ): HooksProcessorReturnType<IOType, BypassType>;
}
