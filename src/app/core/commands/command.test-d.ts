import {expectError, expectType} from "tsd";
import {TypeEqualsType} from "../../../types";
import {Command, GetCommandTypeParams} from "./command";
import {
    AsyncTestCommand,
    BypassTriggerCommandType, MixedDuplicateTypeCommand,
    MixedTypeCommand, MixedTypeObservableCommand, MixedTypeObservableCommandV2, TypeA,
    TypeACommand, TypeB,
    TypeBCommand,
    TypeCCommand,
    TypeDCommand,
    TypeECommand
} from "./command.mocks";


// GetCommandTypeParams

// Interfaces

type ghp1 = GetCommandTypeParams<Command<string>>;
expectType<TypeEqualsType<[string, string], ghp1>>(true);

type ghp2 = GetCommandTypeParams<Command<string, number>>;
expectType<TypeEqualsType<[string, number], ghp2>>(true)

type ghp3 = GetCommandTypeParams<Command<string | number, boolean>>;
expectType<TypeEqualsType<[string | number, boolean], ghp3>>(true);

type ghp4 = GetCommandTypeParams<Command<string | number, number>>;
expectType<TypeEqualsType<[string | number, number], ghp4>>(true);

type ghp5 = GetCommandTypeParams<Command<string, string>>;
expectType<TypeEqualsType<[string, string], ghp5>>(true);

type ghp6 = GetCommandTypeParams<Command<string, string | boolean>>;
expectType<TypeEqualsType<[string, string | boolean], ghp6>>(true);

type ghp7 = GetCommandTypeParams<Command<string, number | boolean | Function>>;
expectType<TypeEqualsType<[string, boolean | number | Function], ghp7>>(true);

// Classes

type ghp8 = GetCommandTypeParams<TypeACommand>;
expectType<TypeEqualsType<[TypeA, TypeA], ghp8>>(true);

type ghp9 = GetCommandTypeParams<TypeBCommand>;
expectType<TypeEqualsType<[TypeB, TypeB], ghp9>>(true);

type ghp10 = GetCommandTypeParams<TypeCCommand>;
expectType<TypeEqualsType<[string, (string | number | Function)], ghp10>>(true);

type ghp11 = GetCommandTypeParams<TypeDCommand>;
expectType<TypeEqualsType<[string, string], ghp11>>(true);

type ghp12 = GetCommandTypeParams<TypeECommand>;
expectType<TypeEqualsType<[string, string], ghp12>>(true);

type ghp13 = GetCommandTypeParams<MixedTypeCommand>;
expectType<TypeEqualsType<[TypeB | TypeA, TypeA | TypeB], ghp13>>(true);

type ghp14 = GetCommandTypeParams<BypassTriggerCommandType>;
expectType<TypeEqualsType<[TypeA, TypeB], ghp14>>(true);

type ghp15 = GetCommandTypeParams<MixedTypeObservableCommand>;
expectType<TypeEqualsType<[string | number, boolean | Function], ghp15>>(true);

type ghp16 = GetCommandTypeParams<MixedTypeObservableCommandV2>;
expectType<TypeEqualsType<[string | number, string | number | boolean | Function], ghp16>>(true);

type ghp17 = GetCommandTypeParams<MixedDuplicateTypeCommand>;
expectType<TypeEqualsType<[string | number, string | Function], ghp17>>(true);

type ghp18 = GetCommandTypeParams<AsyncTestCommand>;
expectType<TypeEqualsType<[TypeA, TypeA], ghp18>>(true);

