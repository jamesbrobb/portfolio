import {expectType} from "tsd";
import {
    CalculateValidBypassType,
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
    TypeAInBOutCommand, TypeAInABOutCommand, TypeABInAOutCommand
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
