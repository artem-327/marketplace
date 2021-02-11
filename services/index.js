/**
 * Function remove empty elements from object with one level (child).
 * @method
 * @param {object} obj The object.
 * @return {object} The object without empty values.
 */
export const getObjectWithoutEmptyElements = obj => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName]
    }
  }
  return obj
}

/**
 * Method returns boolean if string could be parse to the JSON.
 * @method
 * @param {string} str
 * @return {boolean}
 */
export const isJsonString = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
