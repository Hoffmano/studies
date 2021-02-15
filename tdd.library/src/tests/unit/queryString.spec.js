import { queryString, parse } from '../../lib/queryString'

describe('QUERY STRING', function () {
  describe('OBJECT TO QUERY STRING', () => {
    it('should return a valid query string when an object is passed', () => {
      const object = {
        name: 'Gabriel',
        profession: 'developer',
      }

      expect(queryString(object)).toBe('name=Gabriel&profession=developer')
    })

    it('should return a valid query string even when an array is passed as value to one attribute', () => {
      const object = {
        name: 'Gabriel',
        profession: ['developer', 'designer'],
      }

      expect(queryString(object)).toBe(
        'name=Gabriel&profession=developer,designer',
      )
    })

    it('should return a valid query string even when an array is passed as value to one attribute', () => {
      const object = {
        name: 'Gabriel',
        profession: {
          primary: 'developer',
          secondary: 'designer',
        },
      }

      expect(() => {
        queryString(object)
      }).toThrowError()
    })
  })

  describe('QUERY STRING TO OBJECT', () => {
    it('should convert a query string to an object', () => {
      const queryString = 'name=Gabriel&profession=developer'

      expect(parse(queryString)).toEqual({
        name: 'Gabriel',
        profession: 'developer',
      })
    })

    it('should convert a query string of just one attribute to an object', () => {
      const queryString = 'name=Gabriel'

      expect(parse(queryString)).toEqual({
        name: 'Gabriel',
      })
    })

    it('should convert a query string containing multiple values in a single attribute to an object', () => {
      const queryString = 'name=Gabriel&profession=developer,designer'

      expect(parse(queryString)).toEqual({
        name: 'Gabriel',
        profession: ['developer', 'designer'],
      })
    })
  })
})
