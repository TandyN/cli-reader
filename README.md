# command-line-reader-js

To parse command-line arguments in JavaScript.

# Description

This package allows you to define a list of arguments you wish to parse in your JavaScript scripts. You will also have the capability of defining shorthand arguments that map to the the full argument you define.

## Getting Started

### Prerequisites
* Node.js

### Installation

1. Install the package
    ```
    npm install command-line-reader-js
    ```
2. Import the module into your JavaScript script
    ```
    const { CommandLineReader } = require('command-line-reader-js')
    ```
### Usage

#### Basic:
Below is an example usage of `command-line-reader-js`
```
// node ./example.js --arg-one val1 --arg-two val2 --arg-two val3


const { CommandLineReader } = require('command-line-reader-js')

const commandLineReader = new CommandLineReader({
  argumentList: ['--arg-one', '--arg-two'],
})

commandLineReader.getArgumentValues('--arg-one') // return 'val1'
commandLineReader.getArgumentValues('--arg-two') // return ['val2', 'val3']
```

#### Using Shorthand Definitions:

You can add shorthand definitions that map to the full argument

```
// node ./example.js -a val1 --arg-one val2


const { CommandLineReader } = require('command-line-reader-js')

const commandLineReader = new CommandLineReader({
  argumentList: ['--arg-one', '--arg-two'],
  shorthandDefinitions: {
    '-a': '--arg-one',
  },
})

commandLineReader.getArgumentValues('-a') // return ['val1', 'val2']
commandLineReader.getArgumentValues('--arg-one') // return ['val1', 'val2']
```

#### Getting First Arugment As Path:

Your first argument can also be a path (and only the first argument. If the first argument does not find a `-` or `--` character, it's assumed a path).
```
// node ./example.js ./path/to/file
...

commandLineReader.getFirstArgumentPath() // return './path/to/file'
```
#### Notes:

Arguments must conform to the correct format which begin with `--` characters followed by lowercase letters. Additionally you can add `-` character between letters. Shorthand arguments need to begin with a single `-` character followed by a single lowercase letter.
```
Example of correct formatting:
// full arguments
--argone
--arg-one
--arg-two-three

// shorthand arguments
-a
-b
-c
```

## Contributing
Feel free to contribute by submitting a pull request or opening an issue. You can also fork the project and do whatever you want with it.

## License
This project is licensed under the MIT License - see the `LICENSE` file for details