export const required = (val) => val && val !== "";
export const isNumber = (val) => !isNaN(parseFloat(val)) && isFinite(val);
export const min = (val, min) => val > min;

export const messages = {
  required: "Required",
  isNumber: "Must be number",
  min: "Must be grater then 0",
};