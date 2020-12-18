import { getSafe } from '~/utils/functions'
/**
 * Function finds duplicates in array of objects and returns array of keys which are duplicates.
 *
 * @param {array} array The array of objects.
 * @param {string} key The string as key in object.
 * @return {array} The array of unique keys which are the same value in array of object.
 */
export const getArrayKeysWithSameValueByKey = (array, key) => {
  let object = {}
  let result = []

  array.forEach(item => {
    if (!object[item[key]]) object[item[key]] = 0
    object[item[key]] += 1
  })

  for (let prop in object) {
    if (object[prop] >= 2) {
      result.push(prop)
    }
  }
  return result
}
/**
 * Function checks if array of object have some duplication by key.
 *
 * @param {array} arrayJSONStrings The array of JSON strings from inputs Packaging Types.
 * @param {string} key The string of key in object.
 * @return {boolean} The boolean true or false if there are some duplication.
 */
export const checkForDuplicatesByKey = (arrayJSONStrings, key) => {
  if (!getSafe(() => arrayJSONStrings.length, '') || !key) return false
  // Gets array of keys from arrayJSONStrings.
  let keys = arrayJSONStrings.map(t => {
    let type = JSON.parse(t)
    return type[key]
  })
  return new Set(keys).size !== keys.length
}

/**
 * Function reduces array of object based on ids from array of JSON strings.
 *
 * @param {array} arrayJSONStrings The array of JSON strings from inputs Packaging Types.
 * @param {array} arrayTypes The original array of objects from BE packagingTypes.
 * @return {array} The array of objects without the same ids from arrayJSONStrings.
 */
export const removeObjectsById = (arrayJSONStrings, arrayTypes) => {
  if (!getSafe(() => arrayJSONStrings.length, '') || !getSafe(() => arrayTypes.length, '')) return []
  // Gets array of keys from arrayJSONStrings.
  const toDelete = new Set(
    arrayJSONStrings.map(t => {
      let type = JSON.parse(t)
      return type.id
    })
  )
  return arrayTypes.filter(obj => !toDelete.has(obj.id))
}

/**
 * Function returns array of JSON string which have duplicate names from original packagingTypes.
 *
 * @param {array} types The array of JSON string from inputs Packaging Types.
 * @param {array} originalTypes The array of objects from BE packagingTypes.
 * @param {string} key The string of key in object inputs.packagingTypes.
 * @return {array} The array of JSON string.
 */
export const getDuplicatePackagingTypesByKey = (types, originalTypes, key) => {
  if (!getSafe(() => types.length, '') || !key || !getSafe(() => originalTypes.length, '')) return []
  let duplicatePackagingTypes = []

  // Ctreates new unique array of object
  const reducedOriginalTypesArray = removeObjectsById(types, originalTypes)

  // Gets arrray of duplicate names from original array of packaging type from BE.
  let arrayDuplicateKeys = getArrayKeysWithSameValueByKey(originalTypes, key)
  // Checks if exist duplicate name.
  if (arrayDuplicateKeys.length) {
    for (let t of types) {
      let type = JSON.parse(t)
      // Gets duplicate name if user chooses.
      let duplicateValue = arrayDuplicateKeys.find(d => d === type[key])
      if (duplicateValue) {
        for (let p of reducedOriginalTypesArray) {
          // Checks if exist duplicate name in original array and id is not equal with chooses packaging type.
          if (p[key] === duplicateValue && type.id !== p.id) {
            // Adds duplicate to inputs.packaging as string JSON.
            duplicatePackagingTypes.push(JSON.stringify({ id: p.id, [key]: p[key] }))
          }
        }
      }
    }
  }
  return duplicatePackagingTypes
}
