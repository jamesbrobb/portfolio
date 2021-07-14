import { Observable } from 'rxjs';


export interface Hook<I, O = I> {
    execute(input: I): O|Observable<O>;
}
