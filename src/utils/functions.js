export const filterNonEmptyAttributes = object => {
    return Object
        .entries(object)
        .filter(([key, value]) => value !== null && value !== '')
        .reduce((carry, [key, value]) => ({ ...carry, [key]: value}), {})
};
