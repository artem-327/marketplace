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
 * Function returns array of JSON string which have duplicate names from original packagingTypes.
 *
 * @param {array} types The array of JSON string from inputs Packaging Types.
 * @param {array} originalTypes The array of objects from BE packagingTypes.
 * @param {string} key The string of key in object inputs.packagingTypes.
 * @return {array} The array of JSON string.
 */
export const getDuplicatePackagingTypesByKey = (types, originalTypes, key) => {
  if (!types.length || !key) return []
  let duplicatePackagingTypes = []

  // Gets arrray of duplicate names from original array of packaging type from BE.
  let arrayDuplicateKeys = getArrayKeysWithSameValueByKey(originalTypes, key)
  // Checks if exist duplicate name.
  if (arrayDuplicateKeys.length) {
    for (let t of types) {
      let type = JSON.parse(t)
      // Gets duplicate name if user chooses.
      let duplicateValue = arrayDuplicateKeys.find(d => d === type[key])
      if (duplicateValue) {
        for (let p of originalTypes) {
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
