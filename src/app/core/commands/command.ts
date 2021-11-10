import {Observable} from 'rxjs';


export interface Command<I, O = I> {
    execute(input: I): O;
}

export interface ObservableCommand<I, O = I> extends Command<I, Observable<O>> {}
