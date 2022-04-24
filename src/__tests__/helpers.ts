import { isShorthandArgument, isArgument } from '../helpers'

describe('isShorthandArgument', () => {
  it("should only be 2 characters, start with a '-' character, and end with a lowercase letter ", () => {
    expect(isShorthandArgument('-a')).toBe(true)
    expect(isShorthandArgument('-aa')).toBe(false)
    expect(isShorthandArgument('a-')).toBe(false)
    expect(isShorthandArgument('-')).toBe(false)
    expect(isShorthandArgument('-A')).toBe(false)
    expect(isShorthandArgument('-1')).toBe(false)
    expect(isShorthandArgument('--')).toBe(false)
  })
})

describe('isArgument', () => {
  it("should start with '--' characters and end with lowercase letters ", () => {
    expect(isArgument('--a')).toBe(true)
    expect(isArgument('--abcdef')).toBe(true)
    expect(isArgument('-abcdef')).toBe(false)
    expect(isArgument('---abcdef')).toBe(false)
    expect(isArgument('--abcdef-')).toBe(false)
    expect(isArgument('--A')).toBe(false)
    expect(isArgument('--aA')).toBe(false)
  })

  it("should allow after inital '--' and characters to precede with an additional '-' character and lowercase letters multiple times", () => {
    expect(isArgument('--a-b')).toBe(true)
    expect(isArgument('--aa-b')).toBe(true)
    expect(isArgument('--aa-bb')).toBe(true)
    expect(isArgument('--aa-bb-a')).toBe(true)
    expect(isArgument('--aa-bb-aa')).toBe(true)
    expect(isArgument('--a-b-c')).toBe(true)
    expect(isArgument('--aa-bb-cc-dd-ee-ff-gg')).toBe(true)
    expect(isArgument('--aa-bb-')).toBe(false)
    expect(isArgument('--aa--bb')).toBe(false)
    expect(isArgument('--aa-bb--c')).toBe(false)
  })
})
