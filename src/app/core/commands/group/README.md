## Command group

A collection of commands that can safely execute sequentially.

A command type must be specified for the first type parameter of the `CommandGroup` on creation. If not a compile error occurs when attempting to add commands to the group.
<br/><br/>

```ts
import {CommandGroup} from './commands';
import {CommandGroup} from './command-group';

const badGroup = new CommandGroup();
badGroup.addCommand(new CommandOne()); // Error - A type is required for the CommandGroup CommandType type variable

const goodGroup = new CommandGroup<CommandOne>();
goodGroup.addCommand(new CommandOne()); // ok

```
<br/>
The supplied command type must have a common input and output type to ensure supplied commands can safely be executed sequentially.
<br/><br/>

```ts

class NonMatchingIOCommand implements Command<string, number> {
    execute(input: string): number {
        return 1;
    }
}

const badGroup = new CommandGroup<NonMatchingIOCommand>();
badGroup.addCommand(new CommandOne()); // Error - The CommandGroup CommandType type variable has an Input and Output type mismatch

const goodGroup = new CommandGroup<CommandOne>();
goodGroup.addCommand(new CommandOne()); // ok - string

```
<br/>
If the supplied command has a common IO type but also an additional output type, it must be explicitly flagged that this is allowed 
<br/><br/>

```ts

class AdditionalOutputTypeCommand implements Command<number, number | string> {
    execute(input: number): number | string {
        input++;
        if(input > 5) {
            return 'larger than 5'
        }
        return input;
    }
}

const badGroup = new CommandGroup<AdditionalOutputTypeCommand>();
badGroup.addCommand(new AdditionalOutputTypeCommand()); // Error - The CommandGroup CommandType has an additional output type, but the AllowNonMatchingOutputType type parameter was not explicitly set to true

const goodGroup = new CommandGroup<AdditionalOutputTypeCommand, true>();
goodGroup.addCommand(new AdditionalOutputTypeCommand()); // ok - string | number

```

###Command Compatibility
<br/>
The following types are calculated from the command type assigned to the group: 

 - a common IO type - this is determined by extracting the input type from the output type
 - an additional output type - this is determined by excluding the IO type from the output type
 - any additional argument types in its `execute` method - i.e `execute(input: string, arg1: number, arg2: Function): string // [arg1:number, arg2:Function]`
 
<br/>
When attempting to add a command to the group the corresponding types are inferred from the supplied command to test its compatibility.

**A commands common IO type is compatible if:**

 - it's an exact match to the group IO type
 - once the group additional output type is excluded, it's an exact match to the group IO type
 - it's a subtype of the group IO type and its input type is an exact match to the group IO type

**A commands additional output type is compatible if:**

 - it's never
 - it's an exact match with the group additional output type
 - the groups additional output type is a union and the commands additional output type is an exact match with a type in the union

**A commands extra arguments are compatible if:**

 - it has none
 - they're an exact match with the groups
 - it has fewer than the group, but the types match sequentially

```ts

const group = new CommandGroup<CommandOne>();

group.addCommand(new CommandOne()); // OK
group.addCommand(new CommandTwo()); // Error - IO type of CommandGroup and supplied command do not match
```
