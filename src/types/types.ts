import {Observable} from "rxjs";

export type Conditional<T extends boolean, TrueType, FalseType> = T extends true ? TrueType : FalseType;

export type DoesExtend<T1, T2, Distributive extends boolean = true> =
    Conditional<
        Distributive,
        T1 extends T2 ? true : false,
        [T1] extends [T2] ? true : false
    >

export type TypeEqualsType<T1, T2, AllowSubtypeMatch extends boolean = false> =
    Conditional<
        AllowSubtypeMatch,
        DoesExtend<T1, T2>,
        Conditional<DoesExtend<T1, T2, false>, DoesExtend<T2, T1, false>, false>
  >;

export type EqualsNever<T> = [T] extends [never] ? true : false;

export type ReplaceNeverWith<T, U> = Conditional<EqualsNever<T>, U, T>;

export type ReplaceTypeWith<T, U, V> = T extends U ? V : T;

export type UnwrapObservables<T> = T extends Observable<infer U> ? U : T;



// https://stackoverflow.com/a/67609110/1798234
type UnionToIntersectionHelper<U> =
    (U extends unknown ?(k: U) => void : never) extends (k: infer I) => void ? I : never;

export type UnionToIntersection<U> = boolean extends U
  ? UnionToIntersectionHelper<Exclude<U, boolean>> & boolean
  : UnionToIntersectionHelper<U>;

// https://stackoverflow.com/a/50641073/1798234
// If this is a simple type UnionToIntersection<Key> will be the same type, otherwise it will an
// intersection of all types in the union and probably will not extend `Key`
export type NoUnion<Key> = [Key] extends [UnionToIntersection<Key>] ? Key : never;

// https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-504042546
export type NoInfer<T> = [T][T extends any ? 0 : never];

// https://engineering.tableau.com/really-advanced-typescript-types-c590eee59a12
export type ErrorBrand<Err extends string> = Readonly<{
    [key in Err]: void;
}>;
