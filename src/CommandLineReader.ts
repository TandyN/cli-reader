interface ArgumentFunction {
  [key: string]: (argument: Array<string>) => unknown
}

interface ProvidedArgument {
  [key: string]: Array<string>
}

interface ShorthandDefinition {
  [key: string]: string
}

interface CommandLineReaderConstructor {
  argumentFunctions: ArgumentFunction
  providedArguments: ProvidedArgument
  shorthandDefinitions: ShorthandDefinition
  firstArgumentPath: string | null
}

class CommandLineReader {
  #argumentFunctions: ArgumentFunction
  #providedArguments: ProvidedArgument
  #shorthandDefinitions: ShorthandDefinition
  #firstArgumentPath: string | null

  constructor({
    argumentFunctions,
    providedArguments,
    shorthandDefinitions,
    firstArgumentPath,
  }: CommandLineReaderConstructor) {
    this.#argumentFunctions = argumentFunctions
    this.#providedArguments = providedArguments
    this.#shorthandDefinitions = shorthandDefinitions
    this.#firstArgumentPath = firstArgumentPath
  }

  getArgumentValues(arg: string): unknown {
    return this.#argumentFunctions[arg](this.#providedArguments[arg])
  }

  getFirstArgumentPath(): string | null {
    return this.#firstArgumentPath
  }
}

export { CommandLineReader }
