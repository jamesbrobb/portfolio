import {expectType} from "tsd";
import {
    CalculateValidBypassType, CommandGroup,
    GroupAndCommandBypassTypeMismatchError,
    GroupAndSuppliedCommandIOMismatchError,
    GroupBypassTypeNeverError,
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
    ObservableInAndOutCommand
} from "../command.mocks";



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

        // IOType of group is a union and IO of command is not an exact match

        // Group BypassType is never and supplied command BypassType is not
        declare const icc4a: IsCommandCompatible<TypeAInABOutCommand, TypeA, never>
        expectType<GroupBypassTypeNeverError>(icc4a);

        // Group BypassType and supplied command BypassType are both set and do not match
        declare const icc4b: IsCommandCompatible<TypeAInABOutCommand, TypeA, string>
        expectType<GroupAndCommandBypassTypeMismatchError>(icc4b);


// Should be compatible if

    // The group and supplied command IOType are an exact match

        // And the BypassTypes are an exact match - never
        declare const icc5: IsCommandCompatible<TypeACommand, TypeA, never>
        expectType<TypeACommand>(icc5);

        declare const icc6: IsCommandCompatible<TypeAInABOutCommand, TypeA, TypeB>
        expectType<TypeAInABOutCommand>(icc6);

        declare const icc8: IsCommandCompatible<TypeABInABOutCommand, TypeA | TypeB, never>
        expectType<TypeABInABOutCommand>(icc8);

        // And the supplied command BypassType is never
        declare const icc7: IsCommandCompatible<TypeACommand, TypeA, TypeB>
        expectType<TypeACommand>(icc7);

    // The supplied command I contains the group IOType and it's O is an exact match

        // And its BypassType is never
        declare const icc9: IsCommandCompatible<TypeABInAOutCommand, TypeA, never>
        expectType<TypeABInAOutCommand>(icc9);

        declare const icc10: IsCommandCompatible<TypeABInAOutCommand, TypeA, TypeB>
        expectType<TypeABInAOutCommand>(icc10);

        // And its BypassType matches
        type TestCommand = Command<TypeA | TypeB, TypeA | string>
        declare const icc11: IsCommandCompatible<TestCommand, TypeA, string>
        expectType<TestCommand>(icc11);



// CommandGroup

const group1 = new CommandGroup<TypeACommand>(); // TypeACommand, TypeA, never
const group2 = new CommandGroup<TypeBCommand>(); // TypeBCommand, TypeB, never
const group3 = new CommandGroup<TypeAInBOutCommand>(); // TypeAInBOutCommand, never, TypeB - shouldn't be allowed
const group4 = new CommandGroup<TypeAInABOutCommand>(); // TypeAInABOutCommand, TypeA, TypeB
const group5 = new CommandGroup<TypeABInABOutCommand>(); // TypeABInABOutCommand, TypeA | TypeB, never
const group6 = new CommandGroup<TypeABInAOutCommand>(); // TypeABInAOutCommand, TypeA, never

const group7 = new CommandGroup<TypeCCommand>(); // TypeCCommand, string, number | Function
const group8 = new CommandGroup<TypeDCommand>(); // TypeDCommand, string, never
const group9 = new CommandGroup<TypeECommand>(); // TypeECommand, string, never
const group10 = new CommandGroup<MixedTypeObservableCommand>(); // MixedTypeObservableCommand, never, boolean | Function
const group11 = new CommandGroup<MixedTypeObservableCommandV2>(); // MixedTypeObservableCommandV2, string | number, boolean | Function
const group12 = new CommandGroup<MixedDuplicateTypeCommand>(); // MixedDuplicateTypeCommand, string, Function
const group13 = new CommandGroup<AsyncTestCommand>(); // AsyncTestCommand, TypeA, never
const group14 = new CommandGroup<ObservableInAndOutCommand>(); // ObservableInAndOutCommand, TypeA, never

const groupUnion = new CommandGroup<TypeACommand | TypeAInBOutCommand | TypeABInABOutCommand>(); // TypeAInBOutCommand | TypeACommand | TypeABInABOutCommand, TypeA | TypeB, never
const groupIntersection = new CommandGroup<TypeACommand & TypeAInBOutCommand & TypeABInABOutCommand>(); // TypeACommand & TypeAInBOutCommand & TypeABInABOutCommand, TypeA | TypeB, never
