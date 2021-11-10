import {Hook} from "./hook";
import {Observable, of} from "rxjs";

export class TypeA {
    index = 0;
    doSomething(): TypeA {
        this.index++;
        return this;
    }
}

export class TypeB {
    index = 0;
    doSomethingElse(): TypeB {
        this.index++;
        return this;
    }
}


export class TypeAHook implements Hook<TypeA, void> {

    execute(input: TypeA): TypeA {
        return input.doSomething();
    }
}

export class TypeBHook implements Hook<TypeB> {

    execute(input: TypeB): TypeB {
        return input.doSomethingElse();
    }
}

export class TypeCHook implements Hook<string, number | Function>{

    execute(input: string): string | number | Function {
        return input;
    }
}

export class TypeDHook {

    execute(input: string): Observable<string> {
        return of(input);
    }
}

export class TypeEHook {

    execute(input: string): string | Observable<string> {
        return of(input);
    }
}

export class MixedTypeHook implements Hook<TypeA | TypeB> {

    execute(input: TypeA | TypeB): TypeA | TypeB {

        if(input instanceof TypeA) {
            return input.doSomething();
        }
        return input.doSomethingElse();
    }
}

export class BypassHookType implements Hook<TypeB, TypeA> {

    execute(input: TypeB): TypeB | TypeA {

        if(input instanceof TypeB) {
            return input.doSomethingElse();
        }

        return new TypeA();
    }
}

export class MixedTypeObservableHook implements Hook<string | number, Function | boolean> {

    execute(input: string | number): Observable<string | number | Function | boolean> {
        return of(input);
    }
}

export class MixedTypeObservableHookV2 implements Hook<string | number, Function | boolean> {
    execute(input: string | number): string | boolean | Observable<string> | Observable<string | number | Function | boolean> {
        return of(input);
    }
}

export class MixedDuplicateTypeHook implements Hook<string | number, string | Function> {

    execute(input: string | number): string | string | number | Function {
        return input;
    }
}

export class ObservableInputHook {


}
