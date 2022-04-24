import { existsSync as fsExistSync } from 'fs'

import { isShorthandArgument, isArgument } from './helpers'

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
  shorthandDefinitions?: ShorthandDefinition
  processArgvArguments: Array<string>
}

class CommandLineReader {
  #argumentFunctions: ArgumentFunction
  #shorthandDefinitions: ShorthandDefinition
  #providedArguments: ProvidedArgument
  #firstArgumentPath: string | null

  constructor({
    argumentFunctions,
    shorthandDefinitions = {},
    processArgvArguments,
  }: CommandLineReaderConstructor) {
    let allInputArguments = processArgvArguments.slice(2)
    this.#firstArgumentPath = null

    if (
      !isShorthandArgument(allInputArguments[0]) &&
      !isArgument(allInputArguments[0])
    ) {
      if (!fsExistSync(allInputArguments[0])) {
        throw new Error(
          `First argument assumed as path. Path '${allInputArguments[0]}' was not found`,
        )
      }
      this.#firstArgumentPath = allInputArguments[0]
      allInputArguments = processArgvArguments.slice(3)
    }

    this.#argumentFunctions = argumentFunctions
    this.#shorthandDefinitions = shorthandDefinitions
    this.#providedArguments = {}
  }

  getArgumentValues(arg: string): unknown {
    return this.#argumentFunctions[arg](this.#providedArguments[arg])
  }

  getFirstArgumentPath(): string | null {
    return this.#firstArgumentPath
  }
}

export { CommandLineReader }
