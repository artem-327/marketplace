export const required = (val) => val && val !== "";
export const isNumber = (val) => val === '' || (!isNaN(parseFloat(val)) && isFinite(val));
export const min = (val, min) => val === '' || (val > min);
export const maxPercent = (val) => val === '' || val < 101;
export const smaller = (val, max) => {
    return (parseInt(val) <= parseInt(max));
};
export const bigger = (val, min) => {
    return (parseInt(val) >= parseInt(min));
};


export const messages = {
    required: "Required",
    isNumber: "Must be number",
    min: "Must be grater then 0",
    maxPercent: "Maximum is 100%",
    smaller: "Must be < or = to Max",
    bigger: "Must be > or = to Min"
};