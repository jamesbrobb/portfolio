import {Conditional, EqualsNever} from "../../../../types";
import {Observable, of} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {Command, ObservableCommand} from "../command";
import {
    CommandGroupTypeTemplate,
    GetCommandGroupBypassType,
    GetCommandGroupExtraArgsType,
    GetCommandGroupIOType
} from "../group/command-group";



export type CommandProcessorBypassCondition<A, B> = (input: A | B) => input is B;

export type CommandProcessorBypassConditionArgType<A, B> =
    Conditional<
        EqualsNever<B>,
        [],
        [bypassCondition: CommandProcessorBypassCondition<A, B>]
    >

type CommandsType<IO, BY, Xtra extends unknown[]> = (Command<IO, IO | BY, Xtra> | ObservableCommand<IO, IO | BY, Xtra>)





export class CommandProcessor {

    execute<
        GroupType extends CommandGroupTypeTemplate,
        IOType = GetCommandGroupIOType<GroupType>,
        BypassType = GetCommandGroupBypassType<GroupType>,
        ExtraArgsType extends unknown[] = GetCommandGroupExtraArgsType<GroupType>
    >(
        commandGroup: GroupType,
        input: IOType,
        extraArgs: ExtraArgsType,
        ...args: CommandProcessorBypassConditionArgType<IOType, BypassType>

    ): Observable<IOType | BypassType> {

        const initialValue: Observable<IOType> = input instanceof Observable ? input : of(input),
            commands: ReadonlyArray<CommandsType<IOType, IOType | BypassType, ExtraArgsType>> = commandGroup.getCommands() as ReadonlyArray<CommandsType<IOType, IOType | BypassType, ExtraArgsType>>,
            bypassCondition = args[0];

        return commands.reduce(

            (observable: Observable<IOType | BypassType>, command: CommandsType<IOType, IOType | BypassType, ExtraArgsType>): Observable<IOType | BypassType> => {

                return observable.pipe(
                    mergeMap(
                        (inpt: IOType | BypassType) => {

                            if(bypassCondition?.(inpt)) {
                                return of(inpt);
                            }

                            const result = command.execute(inpt as IOType, ...extraArgs);

                            return result instanceof Observable ? result : of(result);
                        })
                );
            },
            initialValue
        );
    }
}
