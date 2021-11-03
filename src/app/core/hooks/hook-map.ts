import {GetHookParams, Hook} from "./hook";
import {Conditional, TypeEqualsType} from "../../../types";


/*
  Compares the two supplied additional output types
  and returns:
 */
export type CalculateValidAdditionalType<ADT, HKADT> =
  Conditional<
    TypeEqualsType<ADT, void>,
    Conditional<
      TypeEqualsType<HKADT, void>,
      void,
      HKADT
    >,
    Conditional<
      TypeEqualsType<HKADT, void>,
      ADT,
      HKADT
    >
  >


export type ValidateHookParams<HKT extends Hook<unknown, unknown>, ADT> =
  ReplaceAdditionalType<GetHookParams<HKT>, ADT>;


export type ReplaceAdditionalType<T extends any[], ADT> =
  [T[0], CalculateValidAdditionalType<ADT, T[1]>];


export type IsValidHook<HKT extends Hook<unknown, unknown>, IOType, AdditionalOutputType = void> =
  Conditional<
    TypeEqualsType<
      [IOType, AdditionalOutputType],
      ValidateHookParams<HKT, AdditionalOutputType>
    >,
    HKT,
    never
  >;


export class HookMap<IOType, AdditionalOutputType = void, ExactMatch extends boolean = true> {

  private readonly _hooks: Hook<IOType, AdditionalOutputType>[] = [];

  addHook<HKT extends Hook<unknown, unknown>>(hook: IsValidHook<HKT, IOType, AdditionalOutputType>): void {
    this._hooks.push(hook as Hook<IOType, AdditionalOutputType>);
  }

  getHooks(): ReadonlyArray<Hook<IOType, AdditionalOutputType>> {
    return this._hooks.concat();
  }
}
