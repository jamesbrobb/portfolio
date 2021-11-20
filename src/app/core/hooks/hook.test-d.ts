import {expectType} from "tsd";
import {Observable} from "rxjs";
import {GetHookParams, Hook, HookReturnType} from "./hook";
import {Equals} from "../../../types";

import {
    TypeA,
    TypeB,
    TypeAHook,
    TypeBHook,
    TypeCHook,
    TypeDHook,
    TypeEHook,
    BypassHookType,
    MixedDuplicateTypeHook,
    MixedTypeHook,
    MixedTypeObservableHook,
    MixedTypeObservableHookV2
} from "./hook.mocks";



declare const bool: boolean;
declare const str: string;
declare const num: number;
declare const vd: void;

declare const strOrNum: string | number;

type Obs<U> = Observable<U>;
type ObsAnd<U> = Obs<U> | U;

declare const obsAndStr: ObsAnd<string>;
declare const obsAndStrOrNum: ObsAnd<string | number>;
declare const obsAndStrOrNumOrFunc: ObsAnd<string | number | Function>;
declare const obsAndStrOrNumOrBoolOrFunc: ObsAnd<string | number | boolean | Function>;


// HookReturnType

expectType<HookReturnType<string>>(obsAndStr);

expectType<HookReturnType<string, void>>(obsAndStr);

expectType<HookReturnType<string, string>>(obsAndStr);

expectType<HookReturnType<string, number>>(obsAndStrOrNum);

expectType<HookReturnType<string | Function, number>>(obsAndStrOrNumOrFunc);

expectType<HookReturnType<string, number | Function>>(obsAndStrOrNumOrFunc);

expectType<HookReturnType<string | Function, number | boolean>>(obsAndStrOrNumOrBoolOrFunc);

type a = HookReturnType<Observable<string>, Observable<string>>;

type b = HookReturnType<Observable<string>, Observable<string | number>>;


// GetHookParams

// Interfaces

type ghp1 = GetHookParams<Hook<string>>;
expectType<Equals<[string, void], ghp1>>(true);

type ghp2 = GetHookParams<Hook<string, number>>;
expectType<Equals<[string, number], ghp2>>(true)

type ghp3 = GetHookParams<Hook<string | number, boolean>>;
expectType<Equals<[string | number, boolean], ghp3>>(true);

type ghp4 = GetHookParams<Hook<string | number, number>>;
expectType<Equals<[string | number, void], ghp4>>(true);

type ghp5 = GetHookParams<Hook<string, string>>;
expectType<Equals<[string, void], ghp5>>(true);

type ghp6 = GetHookParams<Hook<string, string | boolean>>;
expectType<Equals<[string, boolean], ghp6>>(true);

type ghp7 = GetHookParams<Hook<string, number | boolean | Function>>;
expectType<Equals<[string, boolean | number | Function], ghp7>>(true);

// Classes

type ghp8 = GetHookParams<TypeAHook>;
expectType<Equals<[TypeA, void], ghp8>>(true);

type ghp9 = GetHookParams<TypeBHook>;
expectType<Equals<[TypeB, void], ghp9>>(true);

type ghp10 = GetHookParams<TypeCHook>;
expectType<Equals<[string, number | Function], ghp10>>(true);

type ghp11 = GetHookParams<TypeDHook>;
expectType<Equals<[string, void], ghp11>>(true);

type ghp12 = GetHookParams<TypeEHook>;
expectType<Equals<[string, void], ghp12>>(true);

type ghp13 = GetHookParams<MixedTypeHook>;
expectType<Equals<[TypeB | TypeA, void], ghp13>>(true);

type ghp14 = GetHookParams<BypassHookType>;
expectType<Equals<[TypeB, TypeA], ghp14>>(true);

type ghp15 = GetHookParams<MixedTypeObservableHook>;
expectType<Equals<[string | number, boolean | Function], ghp15>>(true);

type ghp16 = GetHookParams<MixedDuplicateTypeHook>;
expectType<Equals<[string | number, Function], ghp16>>(true);

type ghp17 = GetHookParams<MixedTypeObservableHookV2>;
expectType<Equals<[string | number, boolean | Function], ghp17>>(true);
