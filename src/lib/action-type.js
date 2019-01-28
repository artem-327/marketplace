export default function(prefix,...enums) {
    let o = {}

    for(let i = 0; enums.length > i; i++){
        o[enums[i]] = `${prefix}_${enums[i]}`
    }

    return Object.freeze(o)
}