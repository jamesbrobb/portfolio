import {
    Conditional,
    EqualsNever,
    ErrorBrand,
    TypeEqualsType
} from "../../../../types";

import {
    Command,
    CommandTypeTemplate,
    GetCommandTypeParams,
    GetCommandTypeParamsResultTemplateType
} from "../command";



type GetIOType<CommandType extends CommandTypeTemplate> = _GetIOType<GetCommandTypeParams<CommandType, true>>;
type _GetIOType<T extends GetCommandTypeParamsResultTemplateType> = Extract<T[0], T[1]>
type GetBypassType<CommandType extends CommandTypeTemplate> = _GetBypassType<GetCommandTypeParams<CommandType, true>>;
type _GetBypassType<T extends GetCommandTypeParamsResultTemplateType> = Exclude<T[1], T[0]>;
type GetExtraArgsType<CommandType extends CommandTypeTemplate> = _GetExtraArgsType<GetCommandTypeParams<CommandType, true>>
type _GetExtraArgsType<T extends GetCommandTypeParamsResultTemplateType> = T[2];


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
export type GroupExtraArgsMismatchError = ErrorBrand<'CommandGroup and supplied command ExtraArgs do not match'>;



export type IsCommandCompatible<CommandType extends CommandTypeTemplate, IOType, BypassType, ExtraArgsType extends unknown[] = []> =
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
                    Conditional<
                        TypeEqualsType<ExtraArgsType, GetExtraArgsType<CommandType>>, // @todo Be more permissive i.e if group is [string, Function] command can also be [string] or []
                        CommandType,
                        GroupExtraArgsMismatchError
                    >,
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


export type CommandGroupTypeTemplate = CommandGroup<CommandTypeTemplate>;
export type GetCommandGroupTypeParamsResult<CommandType extends CommandTypeTemplate, I, O, ExtraArgs extends unknown[] = unknown[]> = [CommandType, I, O, ExtraArgs];
export type GetCommandGroupTypeParamsResultTypeTemplate = GetCommandGroupTypeParamsResult<CommandTypeTemplate, unknown, unknown>

export type GetCommandGroupTypeParams<GroupType extends CommandGroupTypeTemplate> =
    GroupType extends CommandGroup<infer CT, infer IOT, infer BypassT, infer ExtraArgsT> ?
        [CT, IOT, BypassT, ExtraArgsT] :
        never;

export type GetCommandGroupIOType<GroupType extends CommandGroupTypeTemplate> = _GetCommandGroupIOType<GetCommandGroupTypeParams<GroupType>>
type _GetCommandGroupIOType<T extends GetCommandGroupTypeParamsResultTypeTemplate> = T[1];

export type GetCommandGroupBypassType<GroupType extends CommandGroupTypeTemplate> = _GetCommandGroupBypassType<GetCommandGroupTypeParams<GroupType>>
type _GetCommandGroupBypassType<T extends GetCommandGroupTypeParamsResultTypeTemplate> = T[2];

export type GetCommandGroupExtraArgsType<GroupType extends CommandGroupTypeTemplate> = _GetCommandGroupExtraArgsType<GetCommandGroupTypeParams<GroupType>>
type _GetCommandGroupExtraArgsType<T extends GetCommandGroupTypeParamsResultTypeTemplate> = T[3];





export class CommandGroup<
    CommandType extends CommandTypeTemplate,
    IOType = GetIOType<CommandType>,
    BypassType = GetBypassType<CommandType>,
    ExtraArgsType extends unknown[] = GetExtraArgsType<CommandType>
> {

    private _commands: Command<IOType, IOType | BypassType, ExtraArgsType>[] = [];

    addCommand<T extends CommandTypeTemplate>(command: IsCommandCompatible<T, IOType, BypassType, ExtraArgsType> & T): void {
        this._commands.push(command as Command<IOType, IOType | BypassType, ExtraArgsType>);
    }

    getCommands(): ReadonlyArray<Command<IOType, IOType | BypassType, ExtraArgsType>> {
        return this._commands.concat();
    }
}
