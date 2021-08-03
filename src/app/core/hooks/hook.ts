import { Observable } from 'rxjs';


export type HookReturnType<A, B> = B extends void ? A | Observable<A>: A | B | Observable<A | B>;


export interface Hook<IOType, AdditionalOutputType = void> {
    execute(input: IOType): HookReturnType<IOType, AdditionalOutputType>;
}
