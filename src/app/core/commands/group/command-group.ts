import {Command} from "../command";
import {
    Conditional,
    EqualsNever,
    ErrorBrand,
    TypeEqualsType,
    UnwrapObservables
} from "../../../../types";



type GetCommandTypeParams<T, UnwrapObs extends boolean = true> =
    T extends Command<infer I, infer O> ?
        Conditional<
            UnwrapObs,
            [UnwrapObservables<I>, UnwrapObservables<O>],
            [I, O]
        > :
        never;

type GetIOType<CommandType extends Command<unknown, unknown>> = _GetIOType<GetCommandTypeParams<CommandType>>;
type _GetIOType<T extends [unknown, unknown]> = Extract<T[0], T[1]>
type GetBypassType<CommandType extends Command<unknown, unknown>> = _GetBypassType<GetCommandTypeParams<CommandType>>;
type _GetBypassType<T extends [unknown, unknown]> = Exclude<T[1], T[0]>;


export type CalculateValidBypassType<BT, CMDBT> =
    Conditional<
        TypeEqualsType<BT, never>,
        CMDBT,
        Conditional<
            TypeEqualsType<CMDBT, never>,
            BT,
            CMDBT
        >
    >

type IsCommandCompatible<IOType, BypassType, CommandType extends Command<unknown, unknown>> =
    Conditional<
        TypeEqualsType<GetCommandTypeParams<CommandType>, [unknown, unknown]>,
        ErrorBrand<'Please add a generic parameter type for CommandType'>,
        Conditional<
            EqualsNever<IOType>,
            ErrorBrand<'IOType cannot be never - Input and Output type mismatch'>,
            Conditional<
                TypeEqualsType<IOType, GetIOType<CommandType>>,
                Conditional<
                    TypeEqualsType<BypassType, CalculateValidBypassType<BypassType, GetBypassType<CommandType>>>,
                    CommandType,
                    never
                    >,
                never
                >
            >
        >


class CommandGroup<CommandType extends Command<unknown, unknown>, IOType = GetIOType<CommandType>, BypassType = GetBypassType<CommandType>> {

    private _commands: CommandType[] = [];

    addCommand<T extends CommandType>(command: T): void {
        this._commands.push(command);
    }

    getCommands(): ReadonlyArray<CommandType> {
        return this._commands.concat();
    }
}
