export const required = (val) => val && val !== "";
export const isNumber = (val) => !isNaN(parseFloat(val)) && isFinite(val);
export const min = (val, min) => val > min;
export const isCasNumber = (val) => /^[0-9]{2}[-][0-9]{2}[-][0-9]$/.test(val);

export const messages = {
  required: "Input is required.",
  isNumber: "Input must be number.",
  min: "Value must be grater then 0.",
  isCasNumber: "Must be in format 'xx-xx-x'.",
};