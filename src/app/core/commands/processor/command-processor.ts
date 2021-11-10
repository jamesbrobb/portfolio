import {Conditional, TypeEqualsType} from "../../../../types";
import {Observable, of} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {Command, ObservableCommand} from "../command";


export type CommandProcessorBypassCondition<A, B> = (input: A | B) => input is B;

export type CommandProcessorBypassConditionArgType<A, B> =
    Conditional<
        TypeEqualsType<A, B>,
        [],
        [bypassCondition: CommandProcessorBypassCondition<A, B>]
    >

type CommandsType<A, B> = (Command<A, A | B> | ObservableCommand<A, A | B>)


export class CommandProcessor {

    execute<IOType, BypassType = IOType>(

        input: IOType,
        commands: CommandsType<IOType, IOType | BypassType>[],
        ...args: CommandProcessorBypassConditionArgType<IOType, BypassType>

    ): Observable<IOType | BypassType> {

        const initialValue: Observable<IOType> = input instanceof Observable ? input : of(input),
            bypassCondition = args[0];

        return commands.reduce(

            (observable: Observable<IOType | BypassType>, command: CommandsType<IOType, IOType | BypassType>): Observable<IOType | BypassType> => {

                return observable.pipe(
                    mergeMap(
                        (inpt: IOType | BypassType) => {

                            if(bypassCondition?.(inpt)) {
                                return of(inpt);
                            }

                            const result = command.execute(inpt as IOType);

                            return result instanceof Observable ? result : of(result);
                        })
                );
            },
            initialValue
        );
    }
}
