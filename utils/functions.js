

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



