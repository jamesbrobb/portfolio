## Command processor

```ts
import {CommandProcessor} from 'commands';
import {take} from 'rxjs/operators'

const processor = new CommandProcessor();

processor.execute(group, )
    .pipe(take(1))
    .subscribe((output: string) => {
        
    });
```
