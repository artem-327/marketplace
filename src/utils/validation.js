export const required = (val) => val && val !== "";
export const isNumber = (val) => !isNaN(parseFloat(val)) && isFinite(val);
export const min = (val, min) => val > min;
export const maxPercent = (val) => val < 101;
export const bigger = (val, min) => {
    return val >= min;
};

export const messages = {
    required: "Required",
    isNumber: "Must be number",
    min: "Must be grater then 0",
    maxPercent: "Maximum is 100%",
    bigger: "Must be > or = than min"
};