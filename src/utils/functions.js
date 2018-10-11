import {actions} from 'react-redux-form';

export const filterNonEmptyAttributes = object => {
    return Object
        .entries(object)
        .filter(([key, value]) => value !== null && value !== '')
        .reduce((carry, [key, value]) => ({ ...carry, [key]: value}), {})
};

// eslint-disable-next-line
Number.prototype.formatMoney = function(c){
    let n = this,
        d = ".",
        t = ",",
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c), 10)),
        j = i.length;
    j = j > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

//resetForm is action-creator so its required for usage to include it into index file
export const resetForm = function(model){
    return dispatch => {
        dispatch(actions.reset(model));
    };
}

// eslint-disable-next-line
Number.prototype.formatNumber = function(){
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getUnit = function(unitName) {
    switch (unitName) {
        case "pound":
            return "lb";
            break;
        case "gallon":
            return "gal";
            break;
        default:
            return "#";
    }
}
