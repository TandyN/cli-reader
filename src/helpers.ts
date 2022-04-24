const isShorthandArgument = (argument: string): boolean => {
  /**
   * Argument must start with 1 '-' chharacter followed by
   * a single lowercase letter
   *
   * example: '-a', '-b', '-c'
   */
  const shorthandArgumentRegex = /^-[a-z]$/

  return argument.match(shorthandArgumentRegex) ? true : false
}

const isArgument = (argument: string): boolean => {
  /**
   * Must start with '--' and end with a letter
   * and optionally after that letter, continue with 1 '-' character
   * followed by letters (can be reapeated and end with letters)
   *
   * example: '--abc', '--abc-def', '--abc-def-ghi.....'
   */
  const argumentRegex = /(^--[a-z]*[a-z]){1}((-[a-z]*[a-z])+)?$/

  return argument.match(argumentRegex) ? true : false
}

export { isShorthandArgument, isArgument }
