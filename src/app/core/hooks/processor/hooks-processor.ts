import { Observable } from 'rxjs';
import {Hook} from '../hook';


export type HookBypassCondition<A, B> = (input: A | B) => input is B;

export type HooksProcessorHooksArgType<A, B> = (Hook<A> | Hook<A, B>)[];
export type HooksProcessorBypassConditionArgType<A, B> = B extends void ? [] : [bypassCondition: HookBypassCondition<A, B>]
export type HooksProcessorReturnType<A, B> = B extends void ? Observable<A> : Observable<A | B>;


export interface HooksProcessor {

    execute<IOType, BypassType = void>(

        input: IOType | Observable<IOType>,
        hooks: HooksProcessorHooksArgType<IOType, BypassType>,
        ...args: HooksProcessorBypassConditionArgType<IOType, BypassType>

    ): HooksProcessorReturnType<IOType, BypassType>;
}
