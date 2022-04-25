import { CommandLineReader } from '../CommandLineReader'

describe('CommandLineReader', () => {
  /**
   * firstArgumentPath tests
   */
  it('should set firstArgumentPath to null if the first argument is an argument or a path if the path/file exists', () => {
    const processArgv = ['node path', 'file path', './package.json']

    const commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentList: ['--argument'],
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
        argumentList: ['--argument'],
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
      argumentList: ['--argument'],
      shorthandDefinitions: {
        '-a': '--argument',
      },
    })

    expect(commandLineReader.getFirstArgumentPath()).toBe(null)

    processArgv = ['node path', 'file path', '-a']

    commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentList: ['--argument'],
      shorthandDefinitions: {
        '-a': '--argument',
      },
    })

    expect(commandLineReader.getFirstArgumentPath()).toBe(null)
  })

  /**
   * shorthandDefinitions tests
   */
  it('should throw an error if shorthandDefinitions does not exist as an argument', () => {
    const processArgv = ['node path', 'file path', './package.json']

    expect(() => {
      new CommandLineReader({
        processArgvArguments: processArgv,
        argumentList: ['--argument'],
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
        argumentList: ['--argument'],
        shorthandDefinitions: {
          '-aa': '--argument',
        },
      })
    }).toThrowErrorMatchingInlineSnapshot(`
      "Invalid shorthand of '-aa' in shorthandDefinitions. Shorthand must begin with '-' and end with a lowercase letter.
      (examples: '-a', '-b', '-c')"
    `)
  })

  it('should not require shorthandDefinitions', () => {
    const processArgv = ['node path', 'file path', './package.json']

    expect(() => {
      new CommandLineReader({
        processArgvArguments: processArgv,
        argumentList: ['--argument'],
      })
    }).not.toThrowError()
  })

  /**
   * argumentFunctions
   */
  it('should throw error if argument has incorrect format', () => {
    const processArgv = ['node path', 'file path', './package.json']

    expect(() => {
      new CommandLineReader({
        processArgvArguments: processArgv,
        argumentList: ['-argument'],
      })
    }).toThrowErrorMatchingInlineSnapshot(`
      "Invalid argument of '-argument' in argumentList. Argument must begin with '--' and end with a lowercase letters.
      Optionally it can precede with single '-' characters followed by lowercase letters.
      (examples: '--testing', '--test-argument', '--test-argument-two', ...)"
    `)
  })

  it('should allow multiple valid arguments in list', () => {
    const processArgv = ['node path', 'file path', './package.json']

    expect(() => {
      new CommandLineReader({
        processArgvArguments: processArgv,
        argumentList: ['--argument-one', '--argument-two', '--argument-three'],
      })
    }).not.toThrowError()
  })

  /**
   * getArgumentValues
   */
  it('should return the string if argument only has 1 value', () => {
    const processArgv = ['node path', 'file path', '--arg-one', 'val1']

    const commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentList: ['--arg-one'],
    })

    expect(commandLineReader.getArgumentValues('--arg-one')).toBe('val1')
  })

  it('should return array if the same argument has multiple values', () => {
    const processArgv = [
      'node path',
      'file path',
      '--arg-one',
      'val1',
      '--arg-one',
      'val2',
    ]

    const commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentList: ['--arg-one'],
    })

    expect(commandLineReader.getArgumentValues('--arg-one')).toMatchObject([
      'val1',
      'val2',
    ])
  })

  it('should be able to use shorthand arguments to get values', () => {
    const processArgv = [
      'node path',
      'file path',
      '--arg-one',
      'val1',
      '--arg-one',
      'val2',
    ]

    const commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentList: ['--arg-one'],
      shorthandDefinitions: {
        '-a': '--arg-one',
      },
    })

    expect(commandLineReader.getArgumentValues('-a')).toMatchObject([
      'val1',
      'val2',
    ])
  })

  it("should return null if argument provided doesn't exist", () => {
    const processArgv = [
      'node path',
      'file path',
      '--arg-one',
      'val1',
      '--arg-one',
      'val2',
    ]

    const commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentList: ['--arg-one'],
      shorthandDefinitions: {
        '-a': '--arg-one',
      },
    })

    expect(commandLineReader.getArgumentValues('abc')).toBe(null)
    expect(commandLineReader.getArgumentValues('-def')).toBe(null)
  })
})
