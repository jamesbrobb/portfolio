import {Conditional, DoesExtend, ReplaceNeverWith, TypeEqualsType} from './types';
import {expectError, expectType} from "tsd";

class TypeA {
  doSomething(): TypeA {
    return this;
  }
}

class TypeB {
  doSomethingElse(): TypeB {
    return this;
  }
}

class TypeC {
  doSomething(): TypeC {
    return this;
  }

  doSomethingElse(): TypeB {
    return new TypeB();
  }
}



// Tests for Conditional

declare const type1: Conditional<true, TypeA, TypeB>;
expectType<TypeA>(type1);
expectError<TypeB>(type1);

declare const type2: Conditional<false, TypeA, TypeB>;
expectType<TypeB>(type2);
expectError<TypeA>(type2);


// Tests for DoesExtend

declare const type3: DoesExtend<Object, Function>;
expectType<false>(type3);
expectError<true>(type3);

declare const type4: DoesExtend<Function, Object>;
expectType<true>(type4);
expectError<false>(type4);

declare const type5: DoesExtend<Function, Function>;
expectType<true>(type5);
expectError<false>(type5);


// tests for TypeEqualsType

declare const type6: TypeEqualsType<TypeA, TypeB>;
expectType<false>(type6);

declare const type7: TypeEqualsType<TypeB, TypeA>;
expectType<false>(type7);

declare const type8: TypeEqualsType<TypeB, TypeC>;
expectType<false>(type8);

declare const type9: TypeEqualsType<TypeB, TypeC, true>;
expectType<false>(type9);

declare const type10: TypeEqualsType<TypeC, TypeB, true>;
expectType<true>(type10);

declare const type11: TypeEqualsType<TypeA, TypeB, true>;
expectType<false>(type11);

declare const type12: TypeEqualsType<TypeB, TypeA, true>;
expectType<false>(type12);


// tests for ReplaceNeverWith
declare const type13: ReplaceNeverWith<never, string>;
expectType<string>(type13);

declare const type14: ReplaceNeverWith<number, string>;
expectType<number>(type14);









