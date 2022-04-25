/* eslint-disable @typescript-eslint/no-var-requires */
const { CommandLineReader } = require('./lib/CommandLineReader')

const commandLineReader = new CommandLineReader({
  processArgvArguments: process.argv,
  argumentList: ['--arg'],
})

console.log(commandLineReader.getArgumentValues('--arg'))
console.log(commandLineReader.getFirstArgumentPath())
