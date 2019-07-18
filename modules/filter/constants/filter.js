import moment from 'moment'
import { FormattedNumber } from 'react-intl';

export const operators = {
  CONTAINS: 'CONTAINS',
  EQUALS: 'EQUALS',
  LIKE: 'LIKE',
  LESS_THAN: 'LESS_THAN',
  LESS_THAN_OR_EQUAL_TO: 'LESS_THAN_OR_EQUAL_TO',
  GREATER_THAN: 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL_TO: 'GREATER_THAN_OR_EQUAL_TO'
}

export const filterTypes = {
  PRODUCT_OFFERS: 'product-offers'
}

export const paths = {
  productOffers: {
    productId: 'ProductOffer.product.id',
    quantity: 'ProductOffer.quantity',
    price: 'ProductOffer.pricingPrice',
    packagingTypes: 'ProductOffer.product.packagingType.id',
    productConditions: 'ProductOffer.productCondition.id',
    productGrade: 'ProductGrade.id',
    productForms: 'ProductOffer.productForm.id',
    expirationDate: 'ProductOffer.expirationDate',
    assayFrom: 'ProductOffer.assayMin',
    assayTo: 'ProductOffer.assayMax',
    manufacturedDate: 'ProductOffer.manufacturedDate'
  }
}

export const dateDropdownOptions = [
  { key: 0, value: 'From', text: 'More Than' },
  { key: 1, value: 'To', text: 'Less Than' }
]

export const dateFormat = 'YYYY-MM-DD'


export const replaceAmbigiousCharacters = text => text.toLowerCase().replace(/ /g, '').replace(/\//g, '').replace(/-/g, '')

const checkboxesToFormik = (values, checkboxes) => {
  let obj = {}
  let tmp = values.map((val) => checkboxes.find((ch) => ch.id === parseInt(val.value)))

  tmp.forEach(val => {
    try {
      obj[replaceAmbigiousCharacters(val.name)] = { name: val.name, id: val.id }
    } catch (e) {
      console.error({ val, e })
    }
  })

  return obj
}

export const datagridValues = {
  search: {
    path: paths.productOffers.productId,
    description: 'Chemical Name',
    operator: operators.EQUALS,

    toFilter: function (values) {
      return {
        operator: this.operator,
        path: this.path,
        values: values.map((val) => {
          let parsed = JSON.parse(val)
          return {
            value: parsed.id,
            description: JSON.stringify({ name: parsed.name, casNumberCombined: parsed.casNumberCombined || null })
          }
        }),
        description: this.description
      }
    },

    valuesDescription: function (values) {
      return values.map((val) => {
        let parsed = JSON.parse(val.description)
        if (parsed.casNumberCombined) var text = `${parsed.name} (${parsed.casNumberCombined})`
        else var text = parsed.name

        return text
      })
    },

    tagDescription: function (values) {
      return this.valuesDescription(values)
    },

    toFormik: function ({ values }) {
      return values.map((val) => {
        let parsed = JSON.parse(val.description)
        return JSON.stringify({ id: val.value, name: parsed.name, casNumberCombined: parsed.casNumberCombined || null })
      })
    }
  },


  quantityFrom: {
    path: paths.productOffers.quantity,
    description: 'Quantity From',
    operator: operators.GREATER_THAN_OR_EQUAL_TO,

    toFilter: function (values) {
      return {
        operator: this.operator,
        path: this.path,
        values: [{ value: values, description: values }],
        description: this.description
      }
    },

    tagDescription: (values) => `>= ${values[0].description} pckgs`,

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    toFormik: function ({ values }) {
      return values[0].value.toString()
    }
  },


  quantityTo: {
    path: paths.productOffers.quantity,
    description: 'Quantity To',
    operator: operators.LESS_THAN_OR_EQUAL_TO,

    toFilter: function (values) {
      return ({
        operator: this.operator,
        path: this.path,
        values: [{ value: values, description: values }],
        description: this.description
      })
    },

    tagDescription: (values) => `<= ${values[0].description} pckgs`,

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    toFormik: function ({ values }) {
      return values[0].value.toString()
    }
  },

  priceFrom: {
    path: paths.productOffers.price,
    description: 'Price From',
    operator: operators.GREATER_THAN_OR_EQUAL_TO,

    toFilter: function (values) {
      return ({
        operator: this.operator,
        path: this.path,
        values: [{ value: values, description: values }],
        description: this.description
      })
    },

    tagDescription: (values, { currencyCode } = '$') => <label>{'>= '}{<FormattedNumber style='currency' currency={currencyCode} value={values[0].description} />}</label>,

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    toFormik: function ({ values }) {
      return values[0].value.toString()
    }
  },
  priceTo: {
    path: paths.productOffers.price,
    description: 'Price To',
    operator: operators.LESS_THAN_OR_EQUAL_TO,

    toFilter: function (values) {
      return ({
        operator: this.operator,
        path: this.path,
        values: [{ value: values, description: values }],
        description: this.description
      })
    },

    tagDescription: (values, { currencyCode } = '$') => <label>{'<= '}{<FormattedNumber style='currency' currency={currencyCode} value={values[0].description} />}</label>,

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    toFormik: function ({ values }) {
      return values[0].value.toString()
    }
  },
  packagingTypes: {
    path: paths.productOffers.packagingTypes,
    description: 'Packaging Types',
    operator: operators.EQUALS,

    toFilter: function (values, valuesDescription) {
      return ({
        operator: this.operator,
        path: this.path,
        values: values.map((val, i) => ({ value: val, description: valuesDescription[i] }))
      })
    },

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    tagDescription: function (values) {
      return this.valuesDescription(values)
    },

    toFormik: function ({ values }, packagingTypes) {
      return checkboxesToFormik(values, packagingTypes)
    },

    nested: true
  },
  productConditions: {
    path: paths.productOffers.productConditions,
    description: 'Product Conditions',
    operator: operators.EQUALS,

    toFilter: function (values, valuesDescription) {
      return {
        operator: this.operator,
        path: this.path,
        values: values.map((val, i) => ({ value: val, description: valuesDescription[i] }))
      }
    },

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    tagDescription: function (values) {
      return this.valuesDescription(values)
    },

    toFormik: function ({ values }, productConditions) {
      return checkboxesToFormik(values, productConditions)
    },

    nested: true
  },
  productGrade: {
    path: paths.productOffers.productGrade,
    description: 'Product Grades',
    operator: operators.EQUALS,

    toFilter: function (values, valuesDescription) {
      return {
        operator: this.operator,
        path: this.path,
        values: values.map((val, i) => ({ value: val, description: valuesDescription[i] }))
      }
    },

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    tagDescription: function (values) {
      return this.valuesDescription(values)
    },

    toFormik: function ({ values }, productGrades) {
      return checkboxesToFormik(values, productGrades)
    },

    nested: true
  },
  productForms: {
    operator: operators.EQUALS,
    path: paths.productOffers.productForms,
    description: 'Product Forms',

    toFilter: function (values, valuesDescription) {
      return {
        operator: this.operator,
        path: this.path,
        values: values.map((val, i) => ({ value: val, description: valuesDescription[i] }))
      }
    },

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    tagDescription: function (values) {
      return this.valuesDescription(values)
    },


    toFormik: function ({ values }, productForms) {
      return checkboxesToFormik(values, productForms)
    },

    nested: true
  },

  expirationFrom: {
    operator: operators.GREATER_THAN,
    path: paths.productOffers.expirationDate,
    description: 'Expiration From',

    toFilter: function (values) {
      let date = moment().add(values, 'days')
      return {
        operator: this.operator,
        path: this.path,
        values: [{ value: date.format(), description: date.format(dateFormat) }],
      }
    },

    tagDescription: (values) => `Expires > ${values[0].description}`,

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    toFormik: function ({ values }) {
      return moment(values[0].value.toString()).format(dateFormat)
    }

  },
  expirationTo: {
    operator: operators.LESS_THAN,
    path: paths.productOffers.expirationDate,
    description: 'Expiration To',

    toFilter: function (values) {
      let date = moment().add(values, 'days')
      return {
        operator: this.operator,
        path: this.path,
        values: [{ value: date.format(), description: date.format(dateFormat) }],
      }
    },

    tagDescription: (values) => `Expires < ${values[0].description}`,

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    toFormik: function ({ values }) {
      return moment(values[0].value.toString()).format(dateFormat)
    }

  },

  mfgFrom: {
    operator: operators.LESS_THAN,
    path: paths.productOffers.manufacturedDate,
    description: 'Manufactured Date From',

    toFilter: function (values) {
      let date = moment().subtract(values, 'days')
      return {
        operator: this.operator,
        path: this.path,
        values: [{ value: date.format(), description: date.format(dateFormat) }],
      }
    },

    tagDescription: (values) => `Manufactured > ${values[0].description}`,

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    toFormik: function ({ values }) {
      return moment(values[0].value.toString()).format(dateFormat)
    }

  },

  mfgTo: {
    operator: operators.GREATER_THAN,
    path: paths.productOffers.manufacturedDate,
    description: 'Manufactured Date To',

    toFilter: function (values) {
      let date = moment().subtract(values, 'days')
      return {
        operator: this.operator,
        path: this.path,
        values: [{ value: date.format(), description: date.format(dateFormat) }],
      }
    },

    tagDescription: (values) => `Manufactured < ${values[0].description}`,

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    toFormik: function ({ values }) {
      return moment(values[0].value.toString()).format(dateFormat)
    }

  },

  assayFrom: {
    operator: operators.GREATER_THAN_OR_EQUAL_TO,
    path: paths.productOffers.assayFrom,
    description: 'Assay Min.',

    toFilter: function (values) {
      return {
        operator: this.operator,
        path: this.path,
        values: [{ value: values, description: values }]
      }
    },

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    tagDescription: (values) => `Assay Min. ${values[0].description}%`,

    toFormik: function ({ values }) {
      return values[0].value.toString()
    },

  },
  assayTo: {
    operator: operators.LESS_THAN_OR_EQUAL_TO,
    path: paths.productOffers.assayTo,
    description: 'Assay Max.',

    toFilter: function (values) {

      return {
        operator: this.operator,
        path: this.path,
        values: [{ value: values, description: values }]
      }
    },

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    tagDescription: (values) => `Assay Max. ${values[0].description}%`,

    toFormik: function ({ values }) {
      return values[0].value.toString()
    }
  },
}



export const groupFilters = (appliedFilters, { currencyCode } = '$') => {
  let groups = [{
    description: 'Quantity',
    from: {
      path: paths.productOffers.quantity, operator: operators.GREATER_THAN_OR_EQUAL_TO
    },
    to: {
      path: paths.productOffers.quantity, operator: operators.LESS_THAN_OR_EQUAL_TO
    },
    tagDescription: (from, to) => `${from} - ${to} pkgs`
  }, {
    description: 'Price',
    from: {
      path: paths.productOffers.price, operator: operators.GREATER_THAN_OR_EQUAL_TO
    },
    to: {
      path: paths.productOffers.price, operator: operators.LESS_THAN_OR_EQUAL_TO
    },
    tagDescription: (from, to) => <label><FormattedNumber style='currency' currency={currencyCode} value={from} /> - <FormattedNumber style='currency' currency={currencyCode} value={to} /></label>
    ,
  }, {
    description: 'Assay',
    from: {
      path: paths.productOffers.assayFrom, operator: operators.GREATER_THAN_OR_EQUAL_TO
    },
    to: {
      path: paths.productOffers.assayTo, operator: operators.LESS_THAN_OR_EQUAL_TO
    },
    tagDescription: (from, to) => `${from}% - ${to}% `
  },

  // {
    //   description: 'Expiration',
    //   from: {
    //     path: paths.productOffers.expirationDate, operator: operators.GREATER_THAN_OR_EQUAL_TO
    //   },
    //   to: {
    //     path: paths.productOffers.expirationDate, operator: operators.LESS_THAN_OR_EQUAL_TO
    //   },
    //   tagDescription: (from, to) => `Exp. ${from} - ${to} `
    // },
  ]
  

  // Create copy so we dont mutate original filters
  let filters = appliedFilters.slice()

  let results = [], indexes = []

  groups.forEach(group => {
    let from = filters.findIndex((el) => el.operator === group.from.operator && el.path === group.from.path)
    let to = filters.findIndex((el) => el.operator === group.to.operator && el.path === group.to.path)

    if (from !== -1 && to !== -1) {
      results.push({
        description: group.description,
        valuesDescription: `${filters[from].valuesDescription.toString()} - ${filters[to].valuesDescription.toString()}`,
        tagDescription: group.tagDescription(filters[from].valuesDescription.toString(), filters[to].valuesDescription.toString()),
        indexes: [from, to]
      })
      indexes.push(from, to)
    }
  })

  // Take rest elements (those who aren't grouped) and push them to array

  filters.forEach((filter, i) => {
    if (!indexes.includes(i)) {
      results.push({
        description: filter.description,
        valuesDescription: filter.valuesDescription,
        tagDescription: filter.tagDescription,
        indexes: [i]
      })
    }
  })


  return results
} 