# Hooks

a description of hooks

## Usage

### Hooks

```ts
class HookA implements Hook<string> {

    execute(input: string): string {
        return `${input} input`;
    }
}

class HookB implements Hook<number, string> {
    
    execute(input: number): number | string {

        input++;

        if(input > 5) {
            
            return `${input} bosh`;
        }

        return input;
    }
}

class HookC implements Hook<number> {

    execute(input: number): number {
        return --input;
    }
}

```

### Hook Processor

Simple use

```ts
const processor = new HookProcessor(),
    hooks = [new HookA(), new HookA(), new HookA()];

const result: string = processor.execute<string>('a', hooks);

console.log(result); // "a input input input"

const mixedHooks = [new HookA(), new HookA(), new HookC()];

const mixedResult = processor.execute<string>('a', mixedHooks);

// ERROR: 
// Type 'HookC' is not assignable to type 'Hook<string, void>'.
//   Types of property 'execute' are incompatible.
```
