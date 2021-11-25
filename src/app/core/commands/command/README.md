## Command

```ts

import {Command} from 'commands';

class CommandOne implements Command<string> {
    execute(input: string): string {
        // do something useful
        return input;
    }
}

class CommandTwo implements Command<number> {
    execute(input: number): number {
        // do something useful
        return input;
    }
}

class CommandThree implements Command<number, string, Function> {
    execute(input: number, extra1: string, extra2: Function): number {
        // do something useful
        return input;
    }
}
```
