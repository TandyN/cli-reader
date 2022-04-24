import { CommandLineReader } from '../CommandLineReader'

describe('CommandLineReader', () => {
  it('should set firstArgumentPath to null if the first argument is an argument or a path if the path/file exists', () => {
    const processArgv = ['node path', 'file path', './package.json']

    const commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentFunctions: {},
    })

    expect(commandLineReader.getFirstArgumentPath()).toBe('./package.json')
  })

  it('should throw an error if path/file does not exist', () => {
    const processArgv = ['node path', 'file path', './fakefile.json']

    expect(() => {
      new CommandLineReader({
        processArgvArguments: processArgv,
        argumentFunctions: {},
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"First argument assumed as path. Path './fakefile.json' was not found"`,
    )
  })

  it('should assign firstArgumentPath null if its an argument', () => {
    const processArgv = ['node path', 'file path', '--argument']

    const commandLineReader = new CommandLineReader({
      processArgvArguments: processArgv,
      argumentFunctions: {},
    })

    expect(commandLineReader.getFirstArgumentPath()).toBe(null)
  })
})
