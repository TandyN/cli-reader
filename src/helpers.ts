const isShorthandArgument = (argument: string): boolean => {
  /**
   * Argument must start with 1 '-' character followed by
   * a single lowercase letter
   *
   * example: '-a', '-b', '-c'
   */
  const shorthandArgumentRegex = /^-[a-z]$/

  return argument.match(shorthandArgumentRegex) ? true : false
}

const isArgument = (argument: string): boolean => {
  /**
   * Argument must start with '--' and end with a lowercase letter
   * and optionally after that letter, continue with 1 '-' character
   * followed by letters (can be reapeated and must end with a lowercase letter)
   *
   * example: '--abc', '--abc-def', '--abc-def-ghi.....'
   */
  const argumentRegex = /(^--[a-z]*[a-z]){1}((-[a-z]*[a-z])+)?$/

  return argument.match(argumentRegex) ? true : false
}

export { isShorthandArgument, isArgument }
