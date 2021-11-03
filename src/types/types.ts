
export type Conditional<T extends boolean, TrueType, FalseType> = T extends true ? TrueType : FalseType;

export type DoesExtend<T1, T2> = T1 extends T2 ? true : false;

export type TypeEqualsType<T1, T2, AlsoMatchIfT1isSubtype extends boolean = false> =
  Conditional<
    AlsoMatchIfT1isSubtype,
    DoesExtend<T1, T2>,
    Conditional<DoesExtend<T1, T2>, DoesExtend<T2, T1>, false>
  >;

export type ReplaceNeverWith<T, U> = [T] extends [never] ? U : T;

// https://stackoverflow.com/a/67609110/1798234
type UnionToIntersectionHelper<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type UnionToIntersection<U> = boolean extends U
  ? UnionToIntersectionHelper<Exclude<U, boolean>> & boolean
  : UnionToIntersectionHelper<U>;

// https://stackoverflow.com/a/50641073/1798234
// If this is a simple type UnionToIntersection<Key> will be the same type, otherwise it will an intersection of all types in the union and probably will not extend `Key`
export type NoUnion<Key> = [Key] extends [UnionToIntersection<Key>] ? Key : never;
