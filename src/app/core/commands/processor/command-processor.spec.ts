import {CommandProcessor, CommandProcessorBypassCondition} from "./command-processor";
import {Command, ObservableCommand} from "../command";
import {
    AsyncTestCommand,
    BypassTriggerCommandType, MixedTypeCommand,
    TypeA,
    TypeACommand,
    TypeB
} from "../command.mocks";

import Spy = jasmine.Spy;


fdescribe('CommandProcessor', () => {

    let processor: CommandProcessor,
        commands: (Command<TypeA> | ObservableCommand<TypeA>)[],
        input: TypeA;

    beforeEach(() => {

        processor = new CommandProcessor();

        commands = [
            new TypeACommand(),
            new TypeACommand(),
            new TypeACommand(),
            new TypeACommand()
        ];

        input = new TypeA();
    });

    describe('.execute()', () => {

        it('should sequentially process the supplied commands and return the updated input', (done: Function) => {

            processor.execute<TypeA>(input, commands)
                .subscribe((output: TypeA) => {
                    expect(output.value).toEqual(40);
                    done();
                });
        });

        it('should sequentially process the supplied commands and handle async commands', (done: Function) => {

            commands.splice(2, 0, new AsyncTestCommand());

            processor.execute<TypeA>(input, commands)
                .subscribe((output: TypeA) => {
                    expect(output.value).toEqual(1040);
                    done();
                });
        });

        it('should ignore any subsequent commands when supplied with a bypass condition that fails', (done: Function) => {

            const bypassCondition: CommandProcessorBypassCondition<TypeA, TypeB> = (inpt: TypeA|TypeB): inpt is TypeB => {
                return inpt instanceof TypeB;
            };

            const bypassTestCommands: (Command<TypeA> | ObservableCommand<TypeA> | Command<TypeA, TypeB>)[] = [...commands];

            bypassTestCommands.splice(3, 0, new BypassTriggerCommandType());

            const spy: Spy = spyOn(bypassTestCommands[4], 'execute').and.callThrough();

            processor.execute<TypeA, TypeB>(input, bypassTestCommands, bypassCondition)
                .subscribe((output: TypeA | TypeB) => {
                    expect(output).toEqual(jasmine.any(TypeB));
                    expect(input.value).toBe(30);
                    expect(spy.calls.any()).toBe(false);
                    done();
                });
        });

        fit('should error', (done: Function) => {

            const commands3 = [new MixedTypeCommand(), new TypeACommand(), new TypeACommand()];

            expect(() => {

                processor.execute(new TypeB(), commands3)
                    .subscribe((output: TypeB | TypeA) => {
                        //expect(output.value).toEqual(40);
                        //done();
                    });

            }).toThrow();
        });
    });
});
