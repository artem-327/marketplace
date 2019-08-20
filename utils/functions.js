
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
        <div>{content}</div>
    </div>
)

export const getSafe = (fn, defaultValue = null) => {
    try {
        let value = fn()
        if (!value) return defaultValue
        else return value
    }
    catch (e) {
        return defaultValue
    }
}

export const mapAutocompleteData = autocomplateData => autocomplateData.map((product) => {
    if (product.casNumberCombined) var text = `${product.productName} (${product.casNumberCombined})`
    else var text = product.productName

    return {
        key: product.id,
        text,
        value: JSON.stringify({ id: product.id, name: product.productName, casNumber: product.casNumberCombined || null }),
    }
})

export const deepSearch = (obj, searchFn) => {
    let found = false
    Object.entries(obj).forEach(([key, val]) => {
        if (val && typeof val === 'object') deepSearch(val, searchFn)

        else if (searchFn(val, key)) found = true
    })

    return found
}
