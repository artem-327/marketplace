export const required = (val) => val && val !== "";
export const isNumber = (val) => !isNaN(parseFloat(val)) && isFinite(val);
export const min = (val, min) => val > min;
export const isCasNumber = (val) => /^[0-9]{2}[-][0-9]{2}[-][0-9]$/.test(val);

export const messages = {
  required: "input is required",
  isNumber: "input must be number",
  min: "value must be grater then 0",
  isCasNumber: "must be in format xx-xx-x",
};