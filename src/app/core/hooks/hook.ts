import { Observable } from 'rxjs';
import {ReplaceNeverWith} from "../../../types";


export type HookReturnType<A, B = void> =
  B extends void ?
    A | Observable<A> :
    A | B | Observable<A | B>;


export type GetHookParams<HT extends Hook<unknown, unknown>> =
  HT extends Hook<infer IO, infer A> ?
    [IO, ReplaceNeverWith<Exclude<A, IO>, void>] :
    never;


export interface Hook<IOType, AdditionalOutputType = void> {
    execute(input: IOType): HookReturnType<IOType, AdditionalOutputType>;
}
