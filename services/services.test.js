import { getObjectWithoutEmptyElements } from './index'
/**
 * @test {getObjectWithoutEmptyElements }
 */
describe('`services` function getObjectWithoutEmptyElements', () => {
  test('works only for first level of object! Function returns the same object, if parameter is object with "", null, undefined in second and next levels', () => {
    expect(
      getObjectWithoutEmptyElements({ id: 1, name: { firstName: 'Mirek', middleName: '', surName: 'Kerim' } })
    ).not.toEqual({ id: 1, name: { firstName: 'Mirek', surName: 'Kerim' } }) //missing middleName attribute in expectation result
  })

  test('returns the same value if parametr is {}, [], "", 0, null, undefined, false or true ', () => {
    expect(getObjectWithoutEmptyElements({})).toEqual({})
    expect(getObjectWithoutEmptyElements(null)).toBeNull()
    expect(getObjectWithoutEmptyElements(undefined)).toBeUndefined()
    expect(getObjectWithoutEmptyElements(false)).toBeFalsy()
    expect(getObjectWithoutEmptyElements(true)).toBeTruthy()
    expect(getObjectWithoutEmptyElements('')).toEqual('')
    expect(getObjectWithoutEmptyElements(0)).toEqual(0)
    expect(getObjectWithoutEmptyElements([])).toEqual([])
  })

  test('returns the same object if parameter is object without null, "", undefined elements', () => {
    expect(getObjectWithoutEmptyElements({ id: 1, name: 'Mirek' })).toEqual({ id: 1, name: 'Mirek' })
    expect(getObjectWithoutEmptyElements({ id: 1, name: 'Mirek' })).not.toEqual({ id: 2, name: 'Miroslav' })
  })

  test('returns the same object without atributes with null, undefined, "", if parameter is object with null, undefined, "" values in attributes', () => {
    expect(getObjectWithoutEmptyElements({ id: 1, name: null })).toEqual({ id: 1 })
    expect(getObjectWithoutEmptyElements({ id: 1, name: undefined })).toEqual({ id: 1 })
    expect(getObjectWithoutEmptyElements({ id: 1, name: '' })).toEqual({ id: 1 })
  })

  test('returns the same object if parameter is object with 0, false, {}, [] values in atributes', () => {
    expect(getObjectWithoutEmptyElements({ id: 1, name: 0 })).toEqual({ id: 1, name: 0 })
    expect(getObjectWithoutEmptyElements({ id: 1, name: false })).toEqual({ id: 1, name: false })
    expect(getObjectWithoutEmptyElements({ id: 1, name: {} })).toEqual({ id: 1, name: {} })
    expect(getObjectWithoutEmptyElements({ id: 1, name: [] })).toEqual({ id: 1, name: [] })
  })
})
