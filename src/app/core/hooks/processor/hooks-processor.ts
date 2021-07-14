import { Observable } from 'rxjs';

import { Hook } from '../hook';


export type HookBypassCondition<I> = (input: I) => boolean;


export interface HooksProcessor {

    execute<I,O=I>(
        input: I | Observable<I>,
        hooks: Hook<I, I|O>[],
        bypassCondition?: HookBypassCondition<I|O>

    ): Observable<O>;
}
