import {Command, GetCommandTypeParams} from "../command";
import {
    Conditional,
    EqualsNever,
    ErrorBrand,
    TypeEqualsType
} from "../../../../types";




export type GetIOType<CommandType extends Command<unknown>> = _GetIOType<GetCommandTypeParams<CommandType, true>>;
type _GetIOType<T extends [unknown, unknown]> = Extract<T[0], T[1]>
export type GetBypassType<CommandType extends Command<unknown>> = _GetBypassType<GetCommandTypeParams<CommandType, true>>;
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

export type NoCommandTypeParamError = ErrorBrand<'A type is required for the CommandGroup CommandType type variable'>
export type GroupIOMismatchError = ErrorBrand<'The CommandGroup CommandType type variable has an Input and Output type mismatch'>
export type GroupAndSuppliedCommandIOMismatchError = ErrorBrand<`IOType of CommandGroup and supplied command do not match`>
export type GroupBypassTypeNeverError = ErrorBrand<'CommandGroup BypassType is never but the supplied command BypassType has a type set'>
export type GroupAndCommandBypassTypeMismatchError = ErrorBrand<'CommandGroup and supplied command BypassType do not match'>



export type IsCommandCompatible<CommandType extends Command<unknown>, IOType, BypassType> =
    Conditional<
        TypeEqualsType<[IOType, IOType], [unknown, unknown]>,
        NoCommandTypeParamError,
        Conditional<
            EqualsNever<IOType>,
            GroupIOMismatchError,
            Conditional<
                TypeEqualsType<IOType, GetIOType<CommandType>>,
                Conditional<
                    TypeEqualsType<BypassType, CalculateValidBypassType<BypassType, GetBypassType<CommandType>>>,
                    CommandType,
                    Conditional<
                        EqualsNever<BypassType>,
                        GroupBypassTypeNeverError,
                        GroupAndCommandBypassTypeMismatchError
                    >
                >,
                GroupAndSuppliedCommandIOMismatchError
            >
        >
    >



export class CommandGroup<CommandType extends Command<unknown>, IOType = GetIOType<CommandType>, BypassType = GetBypassType<CommandType>> {

    private _commands: Command<IOType, IOType | BypassType>[] = [];

    addCommand<T extends Command<unknown>>(command: IsCommandCompatible<T, IOType, BypassType> & T): void {
        this._commands.push(command as Command<IOType, IOType | BypassType>);
    }

    getCommands(): ReadonlyArray<Command<IOType, IOType | BypassType>> {
        return this._commands.concat();
    }
}
