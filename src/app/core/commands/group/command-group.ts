import {
    IfElse,
    EqualsNever,
    ErrorBrand,
    StrictExclude,
    StrictExtract,
    Equals, UnionToTuple, TupleElementComparison,
} from "../../../../types";

import {
    Command,
    CommandTypeTemplate,
    GetCommandTypeParams,
    GetCommandTypeParamsResultTemplateType
} from "../command";



export type GetInputType<CommandType extends CommandTypeTemplate> = _GetInputType<GetCommandTypeParams<CommandType, true>>;
type _GetInputType<T extends GetCommandTypeParamsResultTemplateType> = T[0];
export type GetOutputType<CommandType extends CommandTypeTemplate> = _GetOutputType<GetCommandTypeParams<CommandType, true>>;
type _GetOutputType<T extends GetCommandTypeParamsResultTemplateType> = T[1];
export type GetIOType<CommandType extends CommandTypeTemplate> = _GetIOType<GetCommandTypeParams<CommandType, true>>;
type _GetIOType<T extends GetCommandTypeParamsResultTemplateType> = StrictExtract<T[0], T[1]>
export type GetBypassType<CommandType extends CommandTypeTemplate> = _GetBypassType<GetCommandTypeParams<CommandType, true>>;
type _GetBypassType<T extends GetCommandTypeParamsResultTemplateType> = StrictExclude<T[1], T[0]>;
export type GetExtraArgsType<CommandType extends CommandTypeTemplate> = _GetExtraArgsType<GetCommandTypeParams<CommandType, true>>
type _GetExtraArgsType<T extends GetCommandTypeParamsResultTemplateType> = T[2];


export type AreExtraArgsCompatible<T1 extends readonly unknown[], T2 extends readonly unknown[]> =
    0 extends (UnionToTuple<TupleElementComparison<T1, T2> & unknown[]>) ? false : true;


export type CalculateValidIOType<IOT, BYT, CMIOT, CMIT = undefined> =
    IfElse<
        Equals<CMIOT, never>,
        CMIOT,
        IfElse<
            Equals<IOT, CMIOT>,
            CMIOT,
            IfElse<
                Equals<IOT, StrictExclude<CMIOT, BYT>>,
                IOT,
                IfElse<
                    Equals<IOT, CMIT>,
                    IOT,
                    CMIOT
                >
            >
        >
    >


export type CalculateValidBypassType<BT, CMDBT> =
    IfElse<
        Equals<BT, never>,
        CMDBT,
        IfElse<
            Equals<CMDBT, never>,
            BT,
            CMDBT
        >
    >

export type CalculateValidExtrasArgType<EXT extends ReadonlyArray<unknown>, CMDEXT extends ReadonlyArray<unknown>> =
    IfElse<
        Equals<EXT, CMDEXT>,
        CMDEXT,
        IfElse<
            AreExtraArgsCompatible<EXT, CMDEXT>,
            EXT,
            CMDEXT
        >
    >

export type NoCommandTypeParamError = ErrorBrand<'A type is required for the CommandGroup CommandType type variable'>
export type GroupIOMismatchError = ErrorBrand<'The CommandGroup CommandType type variable has an Input and Output type mismatch'>
export type GroupAndSuppliedCommandIOMismatchError = ErrorBrand<`IOType of CommandGroup and supplied command do not match`>
export type GroupBypassTypeNeverError = ErrorBrand<'CommandGroup BypassType is never but the supplied command BypassType has a type set'>
export type GroupAndCommandBypassTypeMismatchError = ErrorBrand<'CommandGroup and supplied command BypassType do not match'>
export type GroupExtraArgsMismatchError = ErrorBrand<'CommandGroup and supplied command ExtraArgs do not match'>;



export type IsCommandCompatible<CommandType extends CommandTypeTemplate, IOType, BypassType, ExtraArgsType extends ReadonlyArray<unknown> = []> =
    IfElse<
        Equals<[IOType, IOType], [unknown, unknown]>,
        NoCommandTypeParamError,
        IfElse<
            EqualsNever<IOType>,
            GroupIOMismatchError,
            IfElse<
                Equals<IOType, CalculateValidIOType<IOType, BypassType, GetIOType<CommandType>, GetInputType<CommandType>>>,
                IfElse<
                    Equals<BypassType, CalculateValidBypassType<BypassType, GetBypassType<CommandType>>>,
                    IfElse<
                        Equals<ExtraArgsType, CalculateValidExtrasArgType<ExtraArgsType, GetExtraArgsType<CommandType>>>,
                        CommandType,
                        GroupExtraArgsMismatchError
                    >,
                    IfElse<
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
export type GetCommandGroupTypeParamsResult<CommandType extends CommandTypeTemplate, I, O, ExtraArgs extends ReadonlyArray<unknown> = readonly unknown[]> = [CommandType, I, O, ExtraArgs];
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
    ExtraArgsType extends ReadonlyArray<unknown> = GetExtraArgsType<CommandType>
> {

    private _commands: Command<IOType, IOType | BypassType, ExtraArgsType>[] = [];

    addCommand<T extends CommandTypeTemplate>(command: IsCommandCompatible<T, IOType, BypassType, ExtraArgsType> & T): void {
        this._commands.push(command as Command<IOType, IOType | BypassType, ExtraArgsType>);
    }

    addCommands<T extends CommandTypeTemplate[]>(commands: T extends CommandTypeTemplate[] ? IsCommandCompatible<T[number], IOType, BypassType, ExtraArgsType>[] & T : never): void {

    }

    getCommands(): ReadonlyArray<Command<IOType, IOType | BypassType, ExtraArgsType>> {
        return this._commands.concat();
    }
}
