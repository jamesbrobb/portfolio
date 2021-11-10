import { Observable } from 'rxjs';
import {ReplaceNeverWith, ReplaceTypeWith} from "../../../types";


type ReplaceVoidInReturnType<T> =
    T extends Observable<infer U> ?
        Observable<ReplaceTypeWith<U, void, never>> :
        ReplaceTypeWith<T, void, never>;

type RemoveDuplicatesAndObservables<A, IO> =
    ReplaceNeverWith<
        A extends Observable<infer U> ?
            Exclude<U, IO> :
            Exclude<A, IO>,
        void>



export type GetHookParams<HT extends Hook<unknown, unknown>> =
    HT extends Hook<infer IO, infer A> ?
        [IO, RemoveDuplicatesAndObservables<A, IO>] :
        never;


export type HookReturnType<T, U = void> = ReplaceVoidInReturnType<T | U | Observable<T | U>>;

export interface Hook<IOType, AdditionalOutputType = void> {
    execute(input: IOType): HookReturnType<IOType, AdditionalOutputType>;
}
