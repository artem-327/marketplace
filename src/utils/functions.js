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
  if (offerDetail.pricingTiers) {
    let tiers = offerDetail.pricingTiers.length > 0 ? offerDetail.pricingTiers : offerDetail.pricingTiers[0].pricePerUOM

    if (tiers instanceof Array) {
      let sortedTiers = tiers.sort((a, b) => a.quantityFrom - b.quantityFrom)
      let index = 0
      for (let i = 0; i < sortedTiers.length; i++) {
        if (quantity >= sortedTiers[i].quantityFrom) {
          index = i
        } else break
      }
      return { quantityFrom: offerDetail.minPkg, price: sortedTiers[index].pricePerUOM }
    }

    return { quantityFrom: offerDetail.minPkg, price: tiers[0].pricePerUOM }
  }
}

export function getLocationString(productOffer) {
  try {
    var location = productOffer.warehouse.deliveryAddress.address
  } catch (e) {
    return ''
  }

  return `${location.province ? `${location.province.abbreviation},` : ''} ${location.country.name}`
}

export function addFirstTier(productOffer) {
  let { pricingTiers, minPkg, price } = productOffer

  let sortedTiers = pricingTiers.sort((a, b) => a.quantityFrom - b.quantityFrom)

  if (sortedTiers.length && minPkg < sortedTiers[0].quantityFrom)
    return { ...productOffer, pricingTiers: [{ quantityFrom: minPkg, price: price.amount }].concat(sortedTiers) }

  return productOffer

}

export const calculateTotalPrice = cart => {
  let cfPriceSubtotal = 0
  let cartItems = cart.cartItems.slice()
  cartItems.forEach(cartItem => {
    cartItem.price = cartItem.cfPriceSubtotal
    cfPriceSubtotal += cartItem.price
  })
  return { ...cart, cfPriceSubtotal, totalPrice: cfPriceSubtotal, cartItems }
}