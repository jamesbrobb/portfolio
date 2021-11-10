import {expectError, expectType} from "tsd";
import {Hook} from "../hook";
import {
    CalculateValidAdditionalType,
    HookMap,
    IsValidHook,
    ValidateHookParams
} from "./hook-map";

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
} from "../hook.mocks";



// CalculateValidAdditionalType

// supplied generic === void

// hook value === void :ok:
declare const cvat1: CalculateValidAdditionalType<void, void>;
expectType<void>(cvat1);

// hook value !== void :no:
declare const cvat2: CalculateValidAdditionalType<TypeB, void>;
expectType<TypeB>(cvat2);

// supplied generic !== void

// hook value === void :ok:
declare const cvat3: CalculateValidAdditionalType<void, TypeA>;
expectType<TypeA>(cvat3);

// generic === hook value :ok:
declare const cvat4: CalculateValidAdditionalType<TypeA, TypeA>;
expectType<TypeA>(cvat4);

// generic !== hook value :no:
declare const cvat5: CalculateValidAdditionalType<TypeB, TypeA>;
expectType<TypeA>(cvat5);



// ValidateHookParams

// supplied additional type === void

// hook additional type !== void
declare const vhp1: ValidateHookParams<Hook<TypeA, TypeB>, void>
expectType<[TypeA, TypeB]>(vhp1);

// hook additional type === void
declare const vhp2: ValidateHookParams<TypeAHook, void>
expectType<[TypeA, void]>(vhp2);

// supplied additional type !== void

// hook additional type === supplied additional type
declare const vhp3: ValidateHookParams<Hook<TypeA, TypeA>, TypeA>
expectType<[TypeA, TypeA]>(vhp3);

// hook additional type !== supplied additional type
declare const vhp4: ValidateHookParams<Hook<TypeA, TypeB>, TypeA>
expectType<[TypeA, TypeB]>(vhp4);

// hook additional type === void
declare const vhp5: ValidateHookParams<TypeAHook, TypeA>
expectType<[TypeA, TypeA]>(vhp5);


declare const vhp6: ValidateHookParams<MixedTypeObservableHookV2, void>
expectType<[string | number, boolean | Function]>(vhp6);

declare const vhp7: ValidateHookParams<MixedTypeObservableHookV2, TypeA>
expectType<[string | number, boolean | Function]>(vhp7);

declare const vhp8: ValidateHookParams<MixedTypeObservableHookV2, Function>
expectType<[string | number, boolean | Function]>(vhp8);


// IsValidHook

declare const type11: IsValidHook<TypeAHook, TypeA>;
expectType<TypeAHook>(type11);

declare const type12: IsValidHook<TypeAHook, TypeB>;
expectType<never>(type12);

declare const type13: IsValidHook<TypeAHook, TypeB | TypeA>;
expectType<never>(type13);

declare const type14: IsValidHook<TypeAHook, TypeA, void>;
expectType<TypeAHook>(type14);

declare const type15: IsValidHook<TypeAHook, TypeA, TypeB>;
expectType<TypeAHook>(type15);

declare const type16: IsValidHook<MixedTypeHook, TypeB>;
expectType<never>(type16);

declare const type17: IsValidHook<MixedTypeHook, TypeA>;
expectType<never>(type17);

declare const type18: IsValidHook<MixedTypeHook, TypeA | TypeB>;
expectType<MixedTypeHook>(type18);

declare const type19: IsValidHook<MixedTypeHook, TypeB | TypeA>;
expectType<MixedTypeHook>(type19);

declare const type20: IsValidHook<MixedTypeHook, TypeB | TypeA, TypeA>;
expectType<MixedTypeHook>(type20);

declare const type21: IsValidHook<MixedTypeHook, TypeB | TypeA, TypeA | TypeB>;
expectType<MixedTypeHook>(type21);

declare const type22: IsValidHook<BypassHookType, TypeB, TypeA>;
expectType<BypassHookType>(type22);

declare const type23: IsValidHook<BypassHookType, TypeB | TypeA, TypeA>;
expectType<never>(type23);

declare const type24: IsValidHook<BypassHookType, TypeB, TypeA | TypeB>;
expectType<BypassHookType>(type24);

declare const type25: ValidateHookParams<BypassHookType, TypeB>


/*
// HookMap

// no type params

let hookMap = new HookMap();
expectError(hookMap.addHook(new TypeAHook()));
expectError(hookMap.addHook(new TypeBHook()));
expectError(hookMap.addHook(new MixedTypeHook()));

// single type param

let hookMap2 = new HookMap<TypeA>();
expectType<void>(hookMap2.addHook(new TypeAHook()));
expectError(hookMap2.addHook(new TypeBHook()));
expectError(hookMap2.addHook(new MixedTypeHook()));

let hookMap3 = new HookMap<TypeB>();
expectError(hookMap3.addHook(new TypeAHook()));
expectType<void>(hookMap3.addHook(new TypeBHook()));
expectError(hookMap3.addHook(new MixedTypeHook()));

let hookMap4 = new HookMap<TypeA | TypeB>();
expectError(hookMap4.addHook(new TypeAHook()));
expectError(hookMap4.addHook(new TypeBHook()));
expectType<void>(hookMap4.addHook(new MixedTypeHook()));

// 2 type params

// non matching additional type, but hook has void type
let hookMap5 = new HookMap<TypeA, TypeB>();
expectType<void>(hookMap5.addHook(new TypeAHook()));
expectError(hookMap5.addHook(new TypeBHook()));
expectError(hookMap5.addHook(new MixedTypeHook()));

// matching additional type
let hookMap6 = new HookMap<TypeB, TypeA>();
expectError<void>(hookMap6.addHook(new TypeAHook()));
expectType<void>(hookMap6.addHook(new TypeBHook()));
expectType<void>(hookMap6.addHook(new BypassHookType()));
expectError(hookMap6.addHook(new MixedTypeHook()));
*/

