import {expectError, expectType} from 'tsd';

import {
    Conditional,
    DoesExtend,
    EqualsNever,
    ReplaceNeverWith,
    TypeEqualsType,
    ReplaceTypeWith, UnwrapObservables
} from './types';

import {Observable} from "rxjs";


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

interface TestInterface<U, T = void> {
    doSomething(arg:U): U | T;
}

class TestClass implements TestInterface<number, string> {

    doSomething(arg: number): number | string {

        if(arg < 5) {
            return arg
        }

        return 'test'
    }
}

class TestClass2 implements TestInterface<number> {

    doSomething(arg: number): number {
        return arg;
    }
}

declare const bool: boolean;
declare const str: string;
declare const num: number;
declare const strOrNum: string | number;



// assertions for Conditional

expectType<Conditional<true, TypeA, TypeB>>(new TypeA);

expectType<Conditional<false, TypeA, TypeB>>(new TypeB);


// assertions for DoesExtend

expectType<DoesExtend<Object, Function>>(false);

expectType<DoesExtend<Function, Object>>(true);

expectType<DoesExtend<Function, Function>>(true);

expectType<DoesExtend<number | string, number>>(bool); // distributive

expectError<DoesExtend<number | string, number, false>>(bool); // non-distributive

expectType<DoesExtend<number | string, number, false>>(false); // non-distributive

expectType<DoesExtend<TestInterface<string, number>, TestInterface<string, number>>>(true);
expectError<DoesExtend<TestInterface<string, number>, TestInterface<string, number>>>(bool);

expectType<DoesExtend<TestInterface<string, number>, TestInterface<string, number>, false>>(true);
expectError<DoesExtend<TestInterface<string, number>, TestInterface<string, number>, false>>(bool);

expectType<DoesExtend<TestInterface<number, string>, TestInterface<string, number>>>(false);
expectError<DoesExtend<TestInterface<number, string>, TestInterface<string, number>>>(bool);

expectType<DoesExtend<TestInterface<number>, TestInterface<string, number>>>(false);
expectError<DoesExtend<TestInterface<number>, TestInterface<string, number>>>(bool);

expectType<DoesExtend<TestInterface<string>, TestInterface<string, number>>>(false);
expectError<DoesExtend<TestInterface<string>, TestInterface<string, number>>>(bool);

expectType<DoesExtend<TestInterface<string>, TestInterface<string, number>, false>>(false);
expectError<DoesExtend<TestInterface<string>, TestInterface<string, number>, false>>(bool);

expectType<DoesExtend<TestInterface<string, number>, TestInterface<string>>>(false);
expectError<DoesExtend<TestInterface<string, number>, TestInterface<string>>>(bool);

expectType<DoesExtend<TestInterface<string, number>, TestInterface<number>>>(false);
expectError<DoesExtend<TestInterface<string, number>, TestInterface<number>>>(bool);

expectType<DoesExtend<TestClass, TestClass>>(true);
expectError<DoesExtend<TestClass, TestClass>>(bool);

expectType<DoesExtend<TestClass, TestClass2>>(false);
expectError<DoesExtend<TestClass, TestClass2>>(bool);

expectType<DoesExtend<TestClass2, TestClass>>(true);
expectError<DoesExtend<TestClass2, TestClass>>(bool);

expectType<DoesExtend<TestClass, TestClass2, false>>(false);
expectError<DoesExtend<TestClass, TestClass2, false>>(bool);

expectType<DoesExtend<TestClass2, TestClass, false>>(true);
expectError<DoesExtend<TestClass2, TestClass, false>>(bool);


// assertions for TypeEqualsType

expectType<TypeEqualsType<TypeA, TypeB>>(false);

expectType<TypeEqualsType<TypeB, TypeA>>(false);

expectType<TypeEqualsType<TypeB, TypeC>>(false);

expectType<TypeEqualsType<TypeB, TypeC, true>>(false);

expectType<TypeEqualsType<TypeC, TypeB, true>>(true);

expectType<TypeEqualsType<TypeA, TypeB, true>>(false);

expectType<TypeEqualsType<TypeB, TypeA, true>>(false);

expectType<TypeEqualsType<TypeB | TypeA, TypeA>>(false);
expectError<TypeEqualsType<TypeB | TypeA, TypeA>>(bool);

expectType<TypeEqualsType<TypeA, TypeA | TypeB>>(false);
expectError<TypeEqualsType<TypeA, TypeA | TypeB>>(bool);

expectType<TypeEqualsType<TypeB | TypeA, TypeA | TypeB>>(true);
expectError<TypeEqualsType<TypeB | TypeA, TypeA | TypeB>>(bool);

// assertions for EqualsNever

expectType<EqualsNever<never>>(true);

expectType<EqualsNever<true>>(false);


// assertions for ReplaceNeverWith

expectType<ReplaceNeverWith<never, string>>(str);

expectType<ReplaceNeverWith<number, string>>(num);

expectType<ReplaceNeverWith<Exclude<string | number, string | number>, true>>(true);


// assertions for ReplaceTypeWith

expectType<ReplaceTypeWith<void, void, string>>(str);

expectType<ReplaceTypeWith<string | number, string, never>>(num);

expectType<ReplaceTypeWith<string | number, boolean, never>>(strOrNum);

expectType<ReplaceTypeWith<string | void, void, never>>(str);


// assertions for UnwrapObservables

expectType<UnwrapObservables<Observable<string>>>(str);

expectType<UnwrapObservables<number | Observable<string>>>(strOrNum);









