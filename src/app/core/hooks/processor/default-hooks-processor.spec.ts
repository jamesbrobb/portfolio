import Spy = jasmine.Spy;

import {Observable, AsyncSubject} from 'rxjs';

import {Hook} from '../hook';
import {DefaultHooksProcessor} from './default-hooks-processor';
import {HookBypassCondition} from './hooks-processor';


class TypeA {
    value = 0;
}

class TypeB {
    status: number;
}


class TestHook implements Hook<TypeA> {

    execute(input: TypeA): TypeA {

        input.value += 10;

        return input;
    }
}

class AsyncTestHook implements Hook<TypeA> {

    execute(input: TypeA): Observable<TypeA> {

        const source: AsyncSubject<TypeA> = new AsyncSubject<TypeA>();

        input.value += 1000;

        setTimeout(() => {
            source.next(input);
            source.complete();
        }, 2000);

        return source.asObservable();
    }
}

class BypassConditionTriggerHook implements Hook<TypeA, TypeB> {

    execute(input: TypeA): TypeB {
        return new TypeB();
    }
}


describe('DefaultHooksProcessor', () => {

    let processor: DefaultHooksProcessor,
        hooks: Hook<TypeA>[],
        input: TypeA;

    beforeEach(() => {

        processor = new DefaultHooksProcessor();

        hooks = [
            new TestHook(),
            new TestHook(),
            new TestHook(),
            new TestHook()
        ];

        input = new TypeA();
    });

    describe('execute', () => {

        it('should sequentially process the supplied hooks and return the updated input', (done: Function) => {

            processor.execute<TypeA>(input, hooks)
                .subscribe((output: TypeA) => {
                    expect(output.value).toEqual(40);
                    done();
                });
        });

        it('should sequentially process the supplied hooks and handle async hooks', (done: Function) => {

            hooks.splice(2, 0, new AsyncTestHook());

            processor.execute<TypeA>(input, hooks)
                .subscribe((output: TypeA) => {
                    expect(output.value).toEqual(1040);
                    done();
                });
        });

        it('should ignore any subsequent hooks when supplied with a bypass condition that fails', (done: Function) => {

            const bypassCondition: HookBypassCondition<TypeA|TypeB> = (inpt: TypeA|TypeB) => {
                return inpt instanceof TypeB;
            };

            const bypassTestHooks: Hook<TypeA, TypeA | TypeB>[] = hooks;

            bypassTestHooks.splice(3, 0, new BypassConditionTriggerHook());

            const spy: Spy = spyOn(hooks[4], 'execute').and.callThrough();

            processor.execute<TypeA, TypeA | TypeB>(input, bypassTestHooks, bypassCondition)
                .subscribe((output: TypeB) => {
                    expect(output).toEqual(jasmine.any(TypeB));
                    expect(input.value).toBe(30);
                    expect(spy.calls.any()).toBe(false);
                    done();
                });
        });
    });
});
