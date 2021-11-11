import {Observable} from 'rxjs';
import {Conditional, UnwrapObservables} from "../../../types";



export type GetCommandTypeParams<T extends Command<unknown>, UnwrapObs extends boolean = false> =
    T extends Command<infer I, infer O> ?
        Conditional<
            UnwrapObs,
            [I, UnwrapObservables<O>],
            [I, O]
            > :
        never;



export interface Command<I, O = I> {
    execute(input: I): O;
}

export interface ObservableCommand<I, O = I> extends Command<I, Observable<O>> {}
