import {GetHookParams, Hook, HookReturnType} from "./hook";
import {expectType} from "tsd";
import {Observable} from "rxjs";

// HookReturnType

declare const type1: HookReturnType<string>;
expectType<string | Observable<string>>(type1);

declare const type2: HookReturnType<string, number>;
expectType<string | number | Observable<string | number>>(type2);


// GetHookParams

declare const type3: GetHookParams<Hook<string>>;
expectType<[string, void]>(type3);

declare const type4: GetHookParams<Hook<string, number>>;
expectType<[string, number]>(type4)

declare const type5: GetHookParams<Hook<string | number, boolean>>;
expectType<[string | number, boolean]>(type5);

declare const type6: GetHookParams<Hook<string | number, number>>;
expectType<[string | number, void]>(type6);

declare const type7: GetHookParams<Hook<string, string>>;
expectType<[string, void]>(type7);


