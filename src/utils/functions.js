import { actions } from 'react-redux-form';

export const filterNonEmptyAttributes = object => {
  return Object
    .entries(object)
    .filter(([key, value]) => value !== null && value !== '')
    .reduce((carry, [key, value]) => ({ ...carry, [key]: value }), {})
};

// eslint-disable-next-line
Number.prototype.formatMoney = function (c) {
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
export const resetForm = function (model) {
  return dispatch => {
    dispatch(actions.reset(model));
  };
}

// eslint-disable-next-line
Number.prototype.formatNumber = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getUnit = function (unitName) {
  switch (unitName) {
    case "pound":
      return "lb";
    case "gallon":
      return "gal";
    default:
      return "#";
  }
}

export const getSelectedDataTable = (dataTable) => {
  if (!dataTable) return 0;
  let selected = 0;
  for (let i = 0; i < dataTable.rowsOpns.length; i++) {
    for (let j = 0; j < dataTable.rowsOpns[i].rows.length; j++) {
      if (dataTable.rowsOpns[i].rows[j].selected) selected++
    }
  }
  return selected;
};

export const getSelectedRowsDataTable = (dataTable) => {
  if (!dataTable) return false;
  let selectedRows = [];
  for (let i = 0; i < dataTable.rowsOpns.length; i++) {
    for (let j = 0; j < dataTable.rowsOpns[i].rows.length; j++) {
      if (dataTable.rowsOpns[i].rows[j].selected) selectedRows.push(dataTable.rowsOpns[i].rows[j].id);
    }
  }
  return selectedRows;
}

export const transformRequestOptions = params => {
  let options = '';
  for (const key in params) {
    if (typeof params[key] !== 'object') {
      options += `${key}=${params[key]}&`;
    } else if (typeof params[key] === 'object' && params[key].length) {
      // eslint-disable-next-line
      params[key].forEach(el => {
        options += `${key}=${el}&`;
      });
    }
  }
  return options ? options.slice(0, -1) : options;
};

export const filterByUniqueProperty = (arr, property) => {
  let uniqueArr = [];
  arr.filter(item => {
    const i = uniqueArr.findIndex(x => x[property] === item[property]);
    if (i <= -1) {
      uniqueArr.push(item);
    }
    return null;
  });
  return uniqueArr;
};


export function getAbbreviation(word) {
  let upper = word.toUpperCase()
  return upper.slice(0, 1) + upper.slice(upper.length - 1, upper.length)
}


export function getPricing(offerDetail, quantity) {
  if (offerDetail.pricing) {
    let tiers = offerDetail.pricingTiers.length > 0 ? offerDetail.pricingTiers : offerDetail.pricing.price

    if (tiers instanceof Array) {
      let sortedTiers = tiers.sort((a, b) => a.quantityFrom - b.quantityFrom)

      for (let i = sortedTiers.length - 1; i >= 0; i--) {
        let { quantityFrom } = sortedTiers[i]

        if (quantity >= quantityFrom) {
          try {
            delete sortedTiers[i].id
          } finally {
            return sortedTiers[i]
          }
        }
      }

      return { quantityFrom: offerDetail.minimum, price: offerDetail.price.amount }
    }

    return { quantityFrom: offerDetail.minimum, price: tiers }
  }
}

export function getLocationString(productOffer) {
  try {
    var location = productOffer.warehouse.address
  } catch (e) {
    return ''
  }

  return `${location.city}, ${location.province ? `${location.province.abbreviation},` : ''} ${location.country.name}`
}

export function addFirstTier(productOffer) {
  let { pricingTiers, minimum, price } = productOffer

  let sortedTiers = pricingTiers.sort((a, b) => a.quantityFrom - b.quantityFrom)

  if (minimum < sortedTiers[0].quantityFrom)
    return { ...productOffer, pricingTiers: [{ quantityFrom: minimum, price: price.amount }].concat(sortedTiers) }

  return productOffer

}