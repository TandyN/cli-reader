interface ArgumentFunction {
  [key: string]: (argument: Array<string> | string) => unknown
}

interface ProvidedArgument {
  [key: string]: Array<string>
}

interface ShorthandDefinition {
  [key: string]: string
}

interface CommandLineReaderConstructor {
  argumentList: Array<string>
  shorthandDefinitions?: ShorthandDefinition
  processArgvArguments: Array<string>
}

export {
  ArgumentFunction,
  ProvidedArgument,
  ShorthandDefinition,
  CommandLineReaderConstructor,
}
