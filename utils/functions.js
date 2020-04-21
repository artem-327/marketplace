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
  if (typeof params !== 'object') return ''
  let keys = Object.keys(params)
  if (keys.length === 0) return ''

  let queryParams = `?${keys[0]}=${params[keys[0]]}`

  for (let i = 1; i < keys.length; i++) {
    queryParams += `&${keys[i]}=${params[keys[i]]}`
  }

  return queryParams
}

export const removeEmpty = obj =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      removeEmpty(val)
      // if (Object.entries(val).length === 0) delete obj[key]
    } else {
      if (val == null) {
        try {
          delete obj[key]
        } catch (e) {
          console.error(e)
          console.error('tried to delete', { obj, key })
        }
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
    max: getSafe(() => el.assayMax, '')
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
      return parseInt(pricingTiers[0].pricePerUOM, 10)
    } else {
      let sortedTiers = pricingTiers.sort((a, b) => a.quantityFrom - b.quantityFrom)
      let index = 0
      for (let i = 0; i < sortedTiers.length; i++) {
        if (quantity >= sortedTiers[i].quantityFrom) {
          index = i
        } else break
      }
      return parseInt(sortedTiers[index].pricePerUOM, 10)
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
