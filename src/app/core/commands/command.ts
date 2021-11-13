import {Observable} from 'rxjs';
import {Conditional, UnwrapObservables} from "../../../types";


export type CommandTypeTemplate = Command<unknown, unknown, unknown[]>;
export type GetCommandTypeParamsResult<I, O, ExtraArgs extends unknown[] = unknown[]> = [I, O, ExtraArgs];
export type GetCommandTypeParamsResultTemplateType = GetCommandTypeParamsResult<unknown, unknown>



export type GetCommandTypeParams<T extends CommandTypeTemplate, UnwrapObs extends boolean = false> =
    T extends Command<infer I, infer O, infer ExtraArgs> ?
        Conditional<
            UnwrapObs,
            GetCommandTypeParamsResult<I, UnwrapObservables<O>, ExtraArgs>,
            GetCommandTypeParamsResult<I, O, ExtraArgs>
            > :
        never;



export interface Command<I, O = I, ExtraArgsType extends unknown[] = []> {
    execute(input: I, ...args: ExtraArgsType): O;
}

export interface ObservableCommand<I, O = I, ExtraArgsType extends unknown[] = []> extends Command<I, Observable<O>, ExtraArgsType> {}
