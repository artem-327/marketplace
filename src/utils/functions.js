export const filterNonEmptyAttributes = object => {
    return Object
        .entries(object)
        .filter(([key, value]) => value !== null && value !== '')
        .reduce((carry, [key, value]) => ({ ...carry, [key]: value}), {})
};

export function capitalizeFirstLetter(string) {
    if (typeof string === 'string' || string instanceof String)
        return string.charAt(0).toUpperCase() + string.slice(1);
    return;
};