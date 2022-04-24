import { CommandLineReader } from '../CommandLineReader'

describe('CommandLineReader', () => {
  it('should set firstArgumentPath to null if the first argument is an argument or a path if the path/file exists', () => {
    const processArgv = ['node path', 'file path', './package.json']

    const commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentFunctions: {
        '--argument': (arg) => arg,
      },
      shorthandDefinitions: {
        '-a': '--argument',
      },
    })

    expect(commandLineReader.getFirstArgumentPath()).toBe('./package.json')
  })

  it('should throw an error if path/file does not exist', () => {
    const processArgv = ['node path', 'file path', './fakefile.json']

    expect(() => {
      new CommandLineReader({
        processArgvArguments: processArgv,
        argumentFunctions: {
          '--argument': (arg) => arg,
        },
        shorthandDefinitions: {
          '-a': '--argument',
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"First argument assumed as path. Path './fakefile.json' was not found"`,
    )
  })

  it('should assign firstArgumentPath null if its an argument', () => {
    let processArgv = ['node path', 'file path', '--argument']

    let commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentFunctions: {
        '--argument': (arg) => arg,
      },
      shorthandDefinitions: {
        '-a': '--argument',
      },
    })

    expect(commandLineReader.getFirstArgumentPath()).toBe(null)

    processArgv = ['node path', 'file path', '-a']

    commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentFunctions: {
        '--argument': (arg) => arg,
      },
      shorthandDefinitions: {
        '-a': '--argument',
      },
    })

    expect(commandLineReader.getFirstArgumentPath()).toBe(null)
  })

  it('should throw an error if shorthandDefinitions does not exist as an argument', () => {
    const processArgv = ['node path', 'file path', './package.json']

    expect(() => {
      new CommandLineReader({
        processArgvArguments: processArgv,
        argumentFunctions: {
          '--argument': (arg) => arg,
        },

        shorthandDefinitions: {
          '-f': '--fake',
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"Shorthand '-f' with definition '--fake' does not exist in argumentFunctions"`,
    )
  })

  it('should throw an error if shorthandDefinitions key has an invalid format', () => {
    const processArgv = ['node path', 'file path', './package.json']

    expect(() => {
      new CommandLineReader({
        processArgvArguments: processArgv,
        argumentFunctions: {
          '--argument': (arg) => arg,
        },

        shorthandDefinitions: {
          '-aa': '--argument',
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(`
      "Invalid shorthand of '-aa' in shorthandDefinitions. Shorthand must begin with '-' and end with a lowercase letter.
      (examples: '-a', '-b', '-c')"
    `)
  })
})
