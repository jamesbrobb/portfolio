import {expectType} from "tsd";

import {
    CalculateValidBypassType,
    CalculateValidExtrasArgType,
    CalculateValidIOType,
    CommandGroup,
    GroupAndCommandBypassTypeMismatchError,
    GroupAndSuppliedCommandIOMismatchError,
    GroupBypassTypeNeverError,
    GroupExtraArgsMismatchError,
    GroupIOMismatchError,
    IsCommandCompatible,
    NoCommandTypeParamError
} from "./command-group";

import {Command} from "../command";

import {
    TypeA,
    TypeB,
    TypeABInABOutCommand,
    TypeACommand,
    TypeAInBOutCommand,
    TypeAInABOutCommand,
    TypeABInAOutCommand,
    TypeBCommand,
    TypeCCommand,
    TypeDCommand,
    TypeECommand,
    MixedTypeObservableCommand,
    MixedTypeObservableCommandV2,
    MixedDuplicateTypeCommand,
    AsyncTestCommand,
    ObservableInAndOutCommand,
    ExtraArgsCommand,
    ExtraArgsCommandWithBypassType
} from "../command.mocks";



// CalculateValidIOType

    // should return a match to the supplied IOType when

        // the IOType and supplied command IOType are an exact match

            declare const cviot1: CalculateValidIOType<TypeA, never, TypeA>;
            expectType<TypeA>(cviot1);

            declare const cviot2: CalculateValidIOType<TypeA, TypeB, TypeA>;
            expectType<TypeA>(cviot2);

            declare const cviot2a: CalculateValidIOType<TypeA | TypeB, never, TypeA | TypeB>;
            expectType<TypeA | TypeB>(cviot2a);

        // the IOType and supplied command IOType excluding the BypassType are an exact match

            declare const cviot3: CalculateValidIOType<TypeA, TypeB, TypeA | TypeB>;
            expectType<TypeA>(cviot3);

        // the Input type of the supplied command and IOType of the group command are an exact match

            declare const cviot3a: CalculateValidIOType<TypeA | TypeB, never, TypeA, TypeA | TypeB>;
            expectType<TypeA | TypeB>(cviot3a);

    // should not return a match to the supplied IOType when

        // the IOType and supplied command IOType aren't an exact match

            declare const cviot4: CalculateValidIOType<TypeA, never, TypeB>;
            expectType<TypeB>(cviot4);

            declare const cviot5: CalculateValidIOType<TypeA, TypeB, TypeB>;
            expectType<TypeB>(cviot5);

        // the IOType of the supplied command is never

            declare const cviot6: CalculateValidIOType<TypeA, TypeB, never>;
            expectType<never>(cviot6);



// CalculateValidBypassType

    // command group command type BypassType === never

        // supplied command BypassType === never :ok:

            declare const cvat1: CalculateValidBypassType<never, never>;
            expectType<never>(cvat1);

        // supplied command BypassType !== never :no:

            declare const cvat2: CalculateValidBypassType<never, TypeA>;
            expectType<TypeA>(cvat2);


    // command group command type BypassType !== never

        // supplied command BypassType === void :no:

            declare const cvat3: CalculateValidBypassType<TypeB, never>;
            expectType<TypeB>(cvat3);

        // supplied command BypassType === command group command type value :ok:

            declare const cvat4: CalculateValidBypassType<TypeA, TypeA>;
            expectType<TypeA>(cvat4);

        // supplied command BypassType !== command group command type value :no:

            declare const cvat5: CalculateValidBypassType<TypeB, TypeA>;
            expectType<TypeA>(cvat5);


// CalculateValidExtrasArgType

    type CommandExtraArgs1 = [string, number]
    type CommandExtraArgs2 = [string, number, Function, TypeA, TypeB, TypeA]

    // should return the supplied command group extra args: OK

        // supplied command extra args === command group extra args

            declare const cveat1: CalculateValidExtrasArgType<CommandExtraArgs1, CommandExtraArgs1>
            expectType<CommandExtraArgs1>(cveat1);

            declare const cveat2: CalculateValidExtrasArgType<CommandExtraArgs2, CommandExtraArgs2>
            expectType<CommandExtraArgs2>(cveat2);

        // supplied command extra args length is less than the command group extra args length but all arg types match

            declare const cveat3: CalculateValidExtrasArgType<CommandExtraArgs1, [string]>
            expectType<CommandExtraArgs1>(cveat3);

            declare const cveat4: CalculateValidExtrasArgType<CommandExtraArgs2, [string]>
            expectType<CommandExtraArgs2>(cveat4)

            declare const cveat5: CalculateValidExtrasArgType<CommandExtraArgs2, [string, number, Function, TypeA]>
            expectType<CommandExtraArgs2>(cveat5)

    // should return the supplied command extra args : FAIL

        // supplied command extra args !== group command extra args

            declare const cveat6: CalculateValidExtrasArgType<CommandExtraArgs1, [string, Function]>
            expectType<[string, Function]>(cveat6);

        // supplied command extra args !== group command extra args at all

            declare const cveat6a: CalculateValidExtrasArgType<CommandExtraArgs1, [number, Function]>
            expectType<[number, Function]>(cveat6a);

            declare const cveat6c: CalculateValidExtrasArgType<[string], [number]>
            expectType<[number]>(cveat6c);

        // supplied command extra args are longer than group command extra args

            declare const cveat7: CalculateValidExtrasArgType<CommandExtraArgs1, [string, number, Function]>
            expectType<[string, number, Function]>(cveat7);

        // supplied command extra args are shorter than group command extra args

            declare const cveat8: CalculateValidExtrasArgType<CommandExtraArgs2, [string, number, boolean]>
            expectType<[string, number, boolean]>(cveat8);



// IsCommandCompatible

// Should not be compatible if

    // Error if the group CommandType type variable is not set

        declare const icc1: IsCommandCompatible<Command<unknown, unknown>, unknown, never>
        expectType<NoCommandTypeParamError>(icc1);

    // Once any calculated bypass type has been removed from O

        // Error if the group CommandType I and O types are a mismatch

            declare const icc2: IsCommandCompatible<TypeAInBOutCommand, never, TypeB>
            expectType<GroupIOMismatchError>(icc2);

        // IO of supplied command does not match IOType of group

            declare const icc3: IsCommandCompatible<TypeACommand, TypeB, never>
            expectType<GroupAndSuppliedCommandIOMismatchError>(icc3);

        // IO of supplied command is a union and IOType of group isn't an exact match

            declare const icc4: IsCommandCompatible<TypeABInABOutCommand, TypeA, never>;
            expectType<GroupAndSuppliedCommandIOMismatchError>(icc4);

            declare const icc4z: IsCommandCompatible<TypeABInABOutCommand, TypeA | string, never>;
            expectType<GroupAndSuppliedCommandIOMismatchError>(icc4z);

        // Group BypassType is never and supplied command BypassType is not

            declare const icc4a: IsCommandCompatible<TypeAInABOutCommand, TypeA, never>
            expectType<GroupBypassTypeNeverError>(icc4a);

        // Group BypassType and supplied command BypassType are both set and do not match

            declare const icc4b: IsCommandCompatible<TypeAInABOutCommand, TypeA, string>
            expectType<GroupAndCommandBypassTypeMismatchError>(icc4b);

    // The Group and supplied command ExtraArgs type does not match

        declare const icc4c: IsCommandCompatible<ExtraArgsCommand, TypeA, never, [number, string]>
        expectType<GroupExtraArgsMismatchError>(icc4c);

        type TestCommand3 = Command<TypeA, TypeA, [string, Function, TypeB, number]>
        declare const icc4d: IsCommandCompatible<TestCommand3, TypeA, never, [string, Function]>
        expectType<GroupExtraArgsMismatchError>(icc4d);



// Should be compatible if

    // The group and supplied command IOType are an exact match

        // And the BypassTypes are an exact match

            declare const icc5: IsCommandCompatible<TypeACommand, TypeA, never>
            expectType<TypeACommand>(icc5);

            declare const icc6: IsCommandCompatible<TypeAInABOutCommand, TypeA, TypeB>
            expectType<TypeAInABOutCommand>(icc6);

            declare const icc8: IsCommandCompatible<TypeABInABOutCommand, TypeA | TypeB, never>
            expectType<TypeABInABOutCommand>(icc8);

            declare const icc9: IsCommandCompatible<TypeABInAOutCommand, TypeA, never>
            expectType<TypeABInAOutCommand>(icc9);

            type TestCommand = Command<TypeA | TypeB, TypeA | string>
            declare const icc11: IsCommandCompatible<TestCommand, TypeA, string>
            expectType<TestCommand>(icc11);

        // And the group BypassType has a type and the supplied command BypassType is never

            declare const icc7: IsCommandCompatible<TypeACommand, TypeA, TypeB>
            expectType<TypeACommand>(icc7);

            declare const icc10: IsCommandCompatible<TypeABInAOutCommand, TypeA, TypeB>
            expectType<TypeABInAOutCommand>(icc10);

    // The supplied command IOType with the group BypassType excluded is an exact match with group IOType

        declare const icc10a: IsCommandCompatible<TypeABInABOutCommand, TypeA, TypeB>
        expectType<TypeABInABOutCommand>(icc10a);

    // The supplied command InputType is an exact match with the group IOType

        // And the BypassType types are an exact match

            declare const icc10b: IsCommandCompatible<TypeABInAOutCommand, TypeA | TypeB, never>
            expectType<TypeABInAOutCommand>(icc10b);

            type TestCommand2 = Command<TypeA | TypeB, TypeA | string>
            declare const icc10d: IsCommandCompatible<TestCommand2, TypeA | TypeB, string>
            expectType<TestCommand2>(icc10d);

        // And the BypassType of the group has a type but the supplied command BypassType is never

            declare const icc10c: IsCommandCompatible<TypeABInAOutCommand, TypeA | TypeB, TypeB>
            expectType<TypeABInAOutCommand>(icc10c);

    // The Group and supplied command ExtraArgs

        // Are an exact match

            // And its BypassType is never
            declare const icc12: IsCommandCompatible<ExtraArgsCommand, TypeA, never, [string, Function]>
            expectType<ExtraArgsCommand>(icc12);

            // And its BypassType matches
            declare const icc13: IsCommandCompatible<ExtraArgsCommandWithBypassType, TypeA, TypeB, [string, Function]>
            expectType<ExtraArgsCommandWithBypassType>(icc13);

        // Are a partial match

            // And its BypassType is never
            declare const icc14: IsCommandCompatible<ExtraArgsCommand, TypeA, never, [string, Function, number, boolean]>
            expectType<ExtraArgsCommand>(icc14);

            // And its BypassType matches
            declare const icc15: IsCommandCompatible<ExtraArgsCommandWithBypassType, TypeA, TypeB, [string, Function, number, boolean]>
            expectType<ExtraArgsCommandWithBypassType>(icc15);



// CommandGroup

expectType<CommandGroup<TypeACommand, TypeA, never, []>>(new CommandGroup<TypeACommand>());

expectType<CommandGroup<TypeBCommand, TypeB, never, []>>(new CommandGroup<TypeBCommand>());

expectType<CommandGroup<TypeAInBOutCommand, never, TypeB, []>>(new CommandGroup<TypeAInBOutCommand>());

expectType<CommandGroup<TypeAInABOutCommand, TypeA, TypeB, []>>(new CommandGroup<TypeAInABOutCommand>());

expectType<CommandGroup<TypeABInABOutCommand, TypeA | TypeB, never, []>>(new CommandGroup<TypeABInABOutCommand>());

expectType<CommandGroup<TypeABInAOutCommand, TypeA, never, []>>(new CommandGroup<TypeABInAOutCommand>());

expectType<CommandGroup<TypeCCommand, string, number | Function, []>>(new CommandGroup<TypeCCommand>());

expectType<CommandGroup<TypeDCommand, string, never, []>>(new CommandGroup<TypeDCommand>());

expectType<CommandGroup<TypeECommand, string, never, []>>(new CommandGroup<TypeECommand>());

expectType<CommandGroup<MixedTypeObservableCommand, never, boolean | Function, []>>(new CommandGroup<MixedTypeObservableCommand>());

expectType<CommandGroup<MixedTypeObservableCommandV2, string | number, boolean | Function, []>>(new CommandGroup<MixedTypeObservableCommandV2>());

expectType<CommandGroup<MixedDuplicateTypeCommand, string, Function, []>>(new CommandGroup<MixedDuplicateTypeCommand>());

expectType<CommandGroup<AsyncTestCommand, TypeA, never, []>>(new CommandGroup<AsyncTestCommand>());

expectType<CommandGroup<ObservableInAndOutCommand, never, TypeA, []>>(new CommandGroup<ObservableInAndOutCommand>());

expectType<CommandGroup<TypeAInBOutCommand | TypeACommand | TypeABInABOutCommand, TypeA | TypeB, never, []>>(new CommandGroup<TypeACommand | TypeAInBOutCommand | TypeABInABOutCommand>());

expectType<CommandGroup<TypeACommand & TypeAInBOutCommand & TypeABInABOutCommand, TypeA | TypeB, never, []>>(new CommandGroup<TypeACommand & TypeAInBOutCommand & TypeABInABOutCommand>());

expectType<CommandGroup<ExtraArgsCommand, TypeA, never, []>>(new CommandGroup<TypeACommand>());

expectType<CommandGroup<ExtraArgsCommandWithBypassType, TypeA, never, []>>(new CommandGroup<TypeACommand>());
