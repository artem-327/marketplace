export const transformRequestOptions = params => {
  let options = ''
  for (const key in params) {
    if (typeof params[key] !== 'object') {
      options += `${key}=${params[key]}&`
    } else if (typeof params[key] === 'object' && params[key].length) {
      // eslint-disable-next-line
      params[key].forEach(el => {
        options += `${key}=${el}&`
      })
    }
  }
  return options ? options.slice(0, -1) : options
}
/**
 * Function removes duplicates in array of objects based on key and returns array with unique objects.
 *
 * @param {array} array The array of objects.
 * @param {string} key The string as key in object.
 * @return {array} The array of objects without duplicates.
 */
export const uniqueArrayByKey = (array, key) => {
  let unique = []

  if (!array[0] || !array[0][key]) {
    return array
  }

  for (let i = 0; i < array.length; i++) {
    let exists = false
    for (let j = 0; j < unique.length; j++) {
      if (unique[j][key] == array[i][key]) exists = true
    }
    if (!exists) unique.push(array[i])
  }

  return unique
}

export const generateToastMarkup = (header, content) => (
  <div>
    <strong>{header}</strong>
    <div style={{ wordBreak: 'break-word' }}>{content}</div>
  </div>
)
/**
 * Get safe value from any variable.
 * @method
 * @param {function} fn Callback returns value or throws error.
 * @template T
 * @param {T} [defaultValue=null] Default value is returned if the first parameter fails.
 * @return {T | any} Returns value or default value.
 * @example
 * getSafe(() => europ.state.region.city.name, 'Default Name City')
 */
export const getSafe = (fn, defaultValue = null) => {
  try {
    let value = fn()
    if (value === null || value === undefined) return defaultValue
    else return value
  } catch (e) {
    return defaultValue
  }
}

export const mapAutocompleteData = autocomplateData =>
  autocomplateData.map(product => {
    if (product.casNumberCombined) var text = `${product.productName} (${product.casNumberCombined})`
    else var text = product.productName

    return {
      key: product.id,
      text,
      value: JSON.stringify({ id: product.id, name: product.productName, casNumber: product.casNumberCombined || null })
    }
  })

export const deepSearch = (obj, searchFn) => {
  var found = false
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') found = deepSearch(val, searchFn)
    else if (searchFn(val, key)) found = true
  })

  return found
}

export const getDeeply = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o)

export const generateQueryString = params => {
  // ! !
  // TODO use encodeURIComponent() in values + deep test
  if (typeof params !== 'object') return ''
  let keys = Object.keys(params)
  if (keys.length === 0) return ''
  let queryParams

  if (Array.isArray(params[keys[0]])) {
    queryParams = `?${keys[0]}=${params[keys[0]][0]}`
    for (let j = 1; j < params[keys[0]].length; j++) {
      queryParams += `&${keys[0]}=${params[keys[0]][j]}`
    }
  } else {
    queryParams = `?${keys[0]}=${params[keys[0]]}`
  }

  for (let i = 1; i < keys.length; i++) {
    if (Array.isArray(params[keys[i]])) {
      queryParams += `&${keys[i]}=${params[keys[i]][0]}`
      for (let j = 1; j < params[keys[i]].length; j++) {
        queryParams += `&${keys[i]}=${params[keys[i]][j]}`
      }
    } else {
      queryParams += `&${keys[i]}=${params[keys[i]]}`
    }
  }

  return queryParams
}

export const removeEmpty = (obj, checkFn) =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && !Array.isArray(val) && typeof val === 'object') {
      removeEmpty(val)
      // if (Object.entries(val).length === 0) delete obj[key]
    } else {
      if (val == null || (checkFn && checkFn(val))) {
        try {
          delete obj[key]
        } catch (e) {
          console.error(e)
          console.error('tried to delete', { obj, key })
        }
      } else if (Array.isArray(val)) {
        val.forEach(arrItem => {
          if (arrItem && (typeof arrItem === 'object' || Array.isArray(arrItem))) removeEmpty(arrItem)
        })
        const newArray = val.filter(arrItem => {
          if (Array.isArray(arrItem) && arrItem.length === 0) return false
          if (typeof arrItem === 'object' && Object.entries(arrItem).length === 0) return false
          if (typeof arrItem === 'string' && arrItem.trim() === '') return false
          return true
        })
        obj[key] = newArray
      } else if (typeof val === 'string') {
        if (val.trim() === '') delete obj[key]
        else obj[key] = val.trim()
      }
    }
  })

export const getDesiredCasProductsProps = casProducts =>
  casProducts.map(el => ({
    casIndexName: el.proprietary ? 'Proprietary' : getSafe(() => el.casProduct.casIndexName),
    casIndexNumber: getSafe(() => el.casProduct.casNumber),
    min: getSafe(() => el.assayMin, ''),
    max: getSafe(() => el.assayMax, ''),
    caprop65: getSafe(() => el.casProduct.caprop65, ''),
    reach: getSafe(() => el.casProduct.reach, '')
  }))

export const formatAssay = (min = null, max = null, delimiter = ' - ') =>
  min ? (max ? (min === max ? `${min}%` : `${min}%${delimiter}${max}%`) : `> ${min}%`) : max ? `< ${max}%` : ''

export const getFloatOrNull = value => {
  let num = Number(value)
  if (value === null || (typeof value === 'string' && !value.length) || isNaN(num)) return null
  else return num
}

export const getIntOrNull = value => {
  let num = parseInt(value)
  if (isNaN(num)) return null
  else return num
}

export const getPrice = (quantity, pricingTiers) => {
  if (pricingTiers) {
    if (pricingTiers.length === 1) {
      return parseFloat(pricingTiers[0].pricePerUOM)
    } else {
      let sortedTiers = pricingTiers.sort((a, b) => a.quantityFrom - b.quantityFrom)
      let index = 0
      for (let i = 0; i < sortedTiers.length; i++) {
        if (quantity >= sortedTiers[i].quantityFrom) {
          index = i
        } else break
      }
      return parseFloat(sortedTiers[index].pricePerUOM)
    }
  }
  return 0
}

export const getFormattedAddress = address => {
  return (
    address.street +
    ', ' +
    address.city +
    ', ' +
    address.zip +
    ', ' +
    (address.province ? address.province + ', ' : '') +
    address.country
  )
}

export function getLocationString(productOffer) {
  try {
    var location = productOffer?.warehouse?.deliveryAddress?.address
  } catch (e) {
    return ''
  }

  return `${location?.province ? `${location?.province?.abbreviation},` : ''} ${location?.country?.name}`
}

export function addFirstTier(productOffer) {
  let { pricingTiers, minPkg, price } = productOffer

  let sortedTiers = pricingTiers.sort((a, b) => a.quantityFrom - b.quantityFrom)

  if (sortedTiers.length && minPkg < sortedTiers[0].quantityFrom)
    return { ...productOffer, pricingTiers: [{ quantityFrom: minPkg, price: price.amount }].concat(sortedTiers) }

  return productOffer
}

export function getPricing(offerDetail, quantity) {
  if (offerDetail.pricingTiers) {
    let tiers = offerDetail.pricingTiers.length > 0 ? offerDetail.pricingTiers : offerDetail.pricingTiers[0].pricePerUOM

    if (tiers instanceof Array) {
      let sortedTiers = tiers.sort((a, b) => a.quantityFrom - b.quantityFrom)
      let index = 0
      for (let i = 0; i < sortedTiers.length; i++) {
        if (quantity >= sortedTiers[i].quantityFrom) {
          index = i
        } else break
      }
      return { quantityFrom: offerDetail.minPkg, price: sortedTiers[index].pricePerUOM }
    }

    return { quantityFrom: offerDetail.minPkg, price: tiers[0].pricePerUOM }
  }
}

export function getMimeType(documentName) {
  const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)
  switch (documentExtension) {
    case 'doc':
      return 'application/msword'
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    case 'ppt':
      return 'application/vnd.ms-powerpoint'
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    case 'xls':
      return 'application/vnd.ms-excel'
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    case 'gif':
      return 'image/gif'
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'svg':
      return 'image/svg'
    case 'pdf':
      return 'application/pdf'
    case '7z':
      return 'application/x-7z-compressed'
    case 'zip':
      return 'application/zip'
    case 'tar':
      return 'application/x-tar'
    case 'rar':
      return 'application/x-rar-compressed'
    case 'xml':
      return 'application/xml'
    default:
      return 'text/plain'
  }
}

export function getFormattedPhone(phoneNumber, countries) {
  const minPrefixLength = phoneNumber.indexOf('-') + 1
  const foundCode = countries.find(country => {
    const phoneCodeLength = country.phoneCode.length
    // some countries can have similar prefix: +1 USA/Canada vs +1-268 Antigua and Barbuda
    if (minPrefixLength >= phoneCodeLength) return false

    if (phoneNumber[0] === '+') {
      return phoneNumber.substring(1, 1 + phoneCodeLength) === country.phoneCode
    } else {
      return phoneNumber.substring(0, phoneCodeLength) === country.phoneCode
    }
  })
  if (foundCode) {
    let formattedNumber = phoneNumber.substring(foundCode.phoneCode.length + (phoneNumber[0] === '+' ? 1 : 0))
    return `+${foundCode.phoneCode} ${formattedNumber.replace(/^(.{3})(.{3})(.*)$/, '$1 $2 $3').trim()}`
  } else {
    return phoneNumber.replace(/^(.{3})(.{3})(.*)$/, '$1 $2 $3').trim()
  }
}
