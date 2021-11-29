import {
    IfElse,
    EqualsNever,
    ErrorBrand,
    StrictExclude,
    Equals,
    UnionToTuple,
    TupleElementComparison, Not,
} from "../../../../types";

import {
    Command,
    CommandTypeTemplate,
    GetCommandTypeParams,
    GetCommandTypeParamsResultTemplateType,
    GetExtraArgsType,
    GetInputType,
    GetIOType
} from "../command/command";


export type GetAdditionalOutputType<CommandType extends CommandTypeTemplate> =
    _GetAdditionalOutputType<GetCommandTypeParams<CommandType, true>>;

type _GetAdditionalOutputType<T extends GetCommandTypeParamsResultTemplateType> =
    StrictExclude<T[1], T[0]>;

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

export type CalculateValidAdditionalOutputType<BT, CMDBT> =
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

export type HasNonMatchingOutputTypeWhenNotAllowed<AllowNonMatchingOutputType extends boolean, AdditionalOutputType> =
    IfElse<
        Not<AllowNonMatchingOutputType>,
        Not<EqualsNever<AdditionalOutputType>>,
        false
    >


export type NoCommandTypeParamError = ErrorBrand<'A type is required for the CommandGroup CommandType type variable'>
export type GroupIOMismatchError = ErrorBrand<'The CommandGroup CommandType type variable has an Input and Output type mismatch'>
export type GroupAdditionalOutputTypeError = ErrorBrand<'The CommandGroup CommandType has an additional output type, but the AllowNonMatchingOutputType type parameter was not explicitly set to true'>
export type GroupAndSuppliedCommandIOMismatchError = ErrorBrand<`IOType of CommandGroup and supplied command do not match`>
export type GroupAdditionalOutputTypeNeverError = ErrorBrand<'CommandGroup AdditionalOutputType is never but the supplied commands AdditionalOutputType has a type set'>
export type GroupAndCommandAdditionalOutputTypeMismatchError = ErrorBrand<'CommandGroup and supplied commands AdditionalOutputType do not match'>
export type GroupExtraArgsMismatchError = ErrorBrand<'CommandGroup and supplied commands ExtraArgs do not match'>;



export type IsCommandCompatible<
    CommandType extends CommandTypeTemplate,
    IOType,
    AdditionalOutputType,
    AllowNonMatchingOutputType extends boolean = false,
    ExtraArgsType extends ReadonlyArray<unknown> = [],
> =
    IfElse<
        Equals<[IOType, IOType], [unknown, unknown]>,
        NoCommandTypeParamError,
        IfElse<
            EqualsNever<IOType>,
            GroupIOMismatchError,
            IfElse<
                HasNonMatchingOutputTypeWhenNotAllowed<AllowNonMatchingOutputType, AdditionalOutputType>,
                GroupAdditionalOutputTypeError,
                IfElse<
                    Equals<IOType, CalculateValidIOType<IOType, AdditionalOutputType, GetIOType<CommandType, true>, GetInputType<CommandType, true>>>,
                    IfElse<
                        Equals<AdditionalOutputType, CalculateValidAdditionalOutputType<AdditionalOutputType, GetAdditionalOutputType<CommandType>>>,
                        IfElse<
                            Equals<ExtraArgsType, CalculateValidExtrasArgType<ExtraArgsType, GetExtraArgsType<CommandType>>>,
                            CommandType,
                            GroupExtraArgsMismatchError
                        >,
                        IfElse<
                            EqualsNever<AdditionalOutputType>,
                            GroupAdditionalOutputTypeNeverError,
                            GroupAndCommandAdditionalOutputTypeMismatchError
                        >
                    >,
                    GroupAndSuppliedCommandIOMismatchError
                >
            >
        >
    >


export type CommandGroupTypeTemplate = CommandGroup<CommandTypeTemplate>;

export type GetCommandGroupTypeParamsResult<
    CommandType extends CommandTypeTemplate,
    AOOK extends boolean,
    IO,
    AO,
    ExtraArgs extends ReadonlyArray<unknown> = readonly unknown[]
> = [CommandType, AOOK, IO, AO, ExtraArgs];

export type GetCommandGroupTypeParamsResultTypeTemplate = GetCommandGroupTypeParamsResult<CommandTypeTemplate, false, unknown, unknown>

export type GetCommandGroupTypeParams<GroupType extends CommandGroupTypeTemplate> =
    GroupType extends CommandGroup<infer CT, infer AddOutTOK, infer IOT, infer AddOutT, infer ExtraArgsT> ?
        [CT, AddOutTOK, IOT, AddOutT, ExtraArgsT] :
        never;

export type GetCommandGroupIOType<GroupType extends CommandGroupTypeTemplate> =
    _GetCommandGroupIOType<GetCommandGroupTypeParams<GroupType>>
type _GetCommandGroupIOType<T extends GetCommandGroupTypeParamsResultTypeTemplate> = T[2];

export type GetCommandGroupAdditionalOutputType<GroupType extends CommandGroupTypeTemplate> =
    _GetCommandGroupAdditionalOutputType<GetCommandGroupTypeParams<GroupType>>
type _GetCommandGroupAdditionalOutputType<T extends GetCommandGroupTypeParamsResultTypeTemplate> = T[3];

export type GetCommandGroupExtraArgsType<GroupType extends CommandGroupTypeTemplate> =
    _GetCommandGroupExtraArgsType<GetCommandGroupTypeParams<GroupType>>
type _GetCommandGroupExtraArgsType<T extends GetCommandGroupTypeParamsResultTypeTemplate> = T[4];



export class CommandGroup<
    CommandType extends CommandTypeTemplate,
    AllowNonMatchingOutputType extends boolean = false,
    IOType = GetIOType<CommandType, true>,
    AdditionalOutputType = GetAdditionalOutputType<CommandType>,
    ExtraArgsType extends ReadonlyArray<unknown> = GetExtraArgsType<CommandType>
> {

    private _commands: Command<IOType, IOType | AdditionalOutputType, ExtraArgsType>[] = [];

    addCommand<T extends CommandTypeTemplate>(
        command: IsCommandCompatible<T, IOType, AdditionalOutputType, AllowNonMatchingOutputType, ExtraArgsType> & T
    ): void {
        this._commands.push(command as Command<IOType, IOType | AdditionalOutputType, ExtraArgsType>);
    }

    addCommands<T extends CommandTypeTemplate[]>(
        commands: IsCommandCompatible<T[number], IOType, AdditionalOutputType, AllowNonMatchingOutputType, ExtraArgsType>[] & T
    ): void {
        commands.forEach((command: CommandTypeTemplate) => {
            this._commands.push(command as Command<IOType, IOType | AdditionalOutputType, ExtraArgsType>);
        });
    }

    getCommands(): ReadonlyArray<Command<IOType, IOType | AdditionalOutputType, ExtraArgsType>> {
        return this._commands.concat();
    }
}
