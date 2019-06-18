

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

    if (!array[0][key]) {
        console.error(`Array does not contain key: ${key}`)
        return array
    }

    for (let i = 0; i < array.length; i++) {
        let exists = false
        for (let j = 0; j < unique.length; j++) {
            if (unique[j][key] === array[i][key]) exists = true
        }
        if (!exists) unique.push(array[i])
    }

    return unique
}
