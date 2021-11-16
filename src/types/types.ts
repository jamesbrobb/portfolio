import {Observable} from "rxjs";


export type StrictExtract<T, U> = T extends unknown ? U extends T ? T extends U ? T : never : never : never;

type _StrictExcludeInner<T, U> = 0 extends (
    U extends unknown ? [T] extends [U] ? [U] extends [T] ? 0 : never : never : never
    ) ? never : T;

export type StrictExclude<T, U> = T extends unknown ? _StrictExcludeInner<T, U> : never;


export type Conditional<T extends boolean, TrueType, FalseType> = T extends true ? TrueType : FalseType;

export type DoesExtend<T1, T2, Distributive extends boolean = true> =
    Conditional<
        Distributive,
        (boolean extends T1 ? boolean : T1) extends T2 ? true : false,
        [T1] extends [T2] ? true : false
    >

// https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
export type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
        (<T>() => T extends Y ? 1 : 2) ? true : false;

export type TypeEqualsType<T1, T2, AllowSubtypeMatch extends boolean = false> =
    Conditional<
        AllowSubtypeMatch,
        DoesExtend<T1, T2>,
        Conditional<DoesExtend<T1, T2, false>, DoesExtend<T2, T1, false>, false>
  >;

export type EqualsNever<T> = [T] extends [never] ? true : false;

export type ReplaceNeverWith<T, U> = Conditional<EqualsNever<T>, U, T>;

export type ReplaceTypeWith<T, U, V> = T extends U ? V : T;

export type ReplaceTypeInTupleWith<T extends unknown[], U, V> = {[P in keyof T] : ReplaceTypeWith<T[P], U, V>}

export type UnwrapObservables<T> = T extends Observable<infer U> ? U : T;

export type AddParameterToTuple<T extends [unknown], U extends unknown[] = []> =
    T extends [] ?
        U :
        T extends [infer H] ?
            [H] extends [never] ?
                U :
                Append<T, U> :
            U


// @link https://stackoverflow.com/a/64194372/1798234
export type Prepend<E extends [unknown], A extends any[]> = [...E, ...A]
export type Append<E extends [unknown], A extends any[]> = [...A, ...E]

// @link https://stackoverflow.com/a/64034671/1798234
export type FilterType<T extends unknown[], U = undefined> = T extends [] ? [] :
    T extends [infer H, ...infer R] ?
    [H] extends [U] ? FilterType<R, U> : [H, ...FilterType<R, U>] : T;

// @link https://stackoverflow.com/a/66146785/1798234
export type SetIndexToType<T extends unknown[], I extends number, U = undefined> = {
    [ P in keyof T ] : P extends Exclude<keyof T, keyof any[]> ? P extends `${I}` ? U : T[P] : T[P]
}

export type SpliceTuple<T extends unknown[], I extends number> = FilterType<SetIndexToType<T, I>>;


// @link https://stackoverflow.com/a/67609110/1798234
type _UnionToIntersectionHelper<U> =
    (U extends unknown ?(k: U) => void : never) extends (k: infer I) => void ? I : never;

export type UnionToIntersection<U> = boolean extends U
  ? _UnionToIntersectionHelper<Exclude<U, boolean>> & boolean
  : _UnionToIntersectionHelper<U>;

// @link https://stackoverflow.com/a/50641073/1798234
// If this is a simple type UnionToIntersection<Key> will be the same type, otherwise it will an
// intersection of all types in the union and probably will not extend `Key`
export type NoUnion<Key> = [Key] extends [UnionToIntersection<Key>] ? Key : never;

// @link https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-504042546
export type NoInfer<T> = [T][T extends any ? 0 : never];

// @link https://engineering.tableau.com/really-advanced-typescript-types-c590eee59a12
export type ErrorBrand<Err extends string> = Readonly<{
    [key in Err]: void;
}>;
