const { sum } = require('../../calculator')

describe('CALCULATOR', () => {
  describe('SUM', () => {
    it('should sum 2 and 2 and the result must be 4', () => {
      expect(sum(2, 2)).toBe(4)
    })

    it('should sum 2 numbers and return the correct answer', () => {
      expect(sum(1, 1)).toBe(2)
      expect(sum(2, 1)).toBe(3)
    })

    it('should sum numbers even if received params are strings', () => {
      expect(sum('1', 1)).toBe(2)
    })

    it('should throw an error if what is provided to the method is not sumable', () => {
      expect(() => {
        sum('', 1)
      }).toThrowError()

      expect(() => {
        sum([1, 1])
      }).toThrowError()

      expect(() => {
        sum({})
      }).toThrowError()

      expect(() => {
        sum()
      }).toThrowError()
    })
  })
})
