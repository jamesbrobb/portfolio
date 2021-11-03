import {expectError, expectType} from "tsd";
import {GetHookParams, Hook} from "./hook";
import {CalculateValidAdditionalType, HookMap, IsValidHook, ValidateHookParams} from "./hook-map";


class TypeA {
  index = 0;
  doSomething(): TypeA {
    this.index++;
    return this;
  }
}

class TypeB {
  index = 0;
  doSomethingElse(): TypeB {
    this.index++;
    return this;
  }
}


class TypeAHook implements Hook<TypeA, void> {

  execute(input: TypeA): TypeA {
    return input.doSomething();
  }
}

class TypeBHook implements Hook<TypeB> {

  execute(input: TypeB): TypeB {
    return input.doSomethingElse();
  }
}

class MixedTypeHook implements Hook<TypeA | TypeB, string | number> {

  execute(input: TypeA | TypeB): TypeA | TypeB | string | number {

    if(input instanceof TypeA) {
      return input.doSomething();
    }
    return input.doSomethingElse();
  }
}

class BypassHookType implements Hook<TypeB, TypeA> {

  execute(input: TypeB): TypeB | TypeA {

    if(input instanceof TypeB) {
      return input.doSomethingElse();
    }

    return new TypeA();
  }
}


// GetHookParams

type hp1 = GetHookParams<MixedTypeHook>
let a: hp1 = [new TypeB(), new TypeA()];

type ex = Exclude<hp1[1], hp1[0]>

let blah: ex = new TypeA();


// CalculateValidAdditionalType

// supplied generic === void

// hook value === void :ok:
declare const type1: CalculateValidAdditionalType<void, void>;
expectType<void>(type1);

// hook value !== void :no:
declare const type2: CalculateValidAdditionalType<TypeB, void>;
expectType<TypeB>(type2);

// supplied generic !== void

// hook value === void :ok:
declare const type3: CalculateValidAdditionalType<void, TypeA>;
expectType<TypeA>(type3);

// generic === hook value :ok:
declare const type4: CalculateValidAdditionalType<TypeA, TypeA>;
expectType<TypeA>(type4);

// generic !== hook value :no:
declare const type5: CalculateValidAdditionalType<TypeB, TypeA>;
expectType<TypeA>(type5);



// ValidateHookParams

declare const type6: ValidateHookParams<TypeAHook, void>
expectType<[TypeA, void]>(type6);

declare const type7: ValidateHookParams<Hook<TypeA, TypeB>, void>
expectType<[TypeA, TypeB]>(type7);

declare const type8: ValidateHookParams<TypeAHook, TypeA>
expectType<[TypeA, TypeA]>(type8);

declare const type9: ValidateHookParams<Hook<TypeA, TypeA>, TypeA>
expectType<[TypeA, TypeA]>(type9);

declare const type10: ValidateHookParams<Hook<TypeA, TypeB>, TypeA>
expectType<[TypeA, TypeB]>(type10);

declare const type10a: ValidateHookParams<BypassHookType, TypeA>
expectType<[TypeB, TypeA]>(type10a);



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

declare const type22: IsValidHook<BypassHookType, TypeB | TypeA, TypeA | TypeB>;
expectType<BypassHookType>(type22);



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


