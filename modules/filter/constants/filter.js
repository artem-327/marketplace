import moment from 'moment'

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
    assayTo: 'ProductOffer.assayMax'
  }
}

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

    toFormik: function ({ values }, productForms) {
      return checkboxesToFormik(values, productForms)
    },

    nested: true
  },
  dateFrom: {
    operator: operators.GREATER_THAN_OR_EQUAL_TO,
    path: paths.productOffers.expirationDate,
    description: 'Expiration From',

    toFilter: function (values) {
      return {
        operator: this.operator,
        path: this.path,
        values: [{ value: moment(values).format(), description: moment(values.toString()).format(dateFormat) }],
      }
    },

    valuesDescription: function (values) {
      return values.map((val) => val.description)
    },

    toFormik: function ({ values }) {
      return moment(values[0].value.toString()).format(dateFormat)
    }

  },
  dateTo: {
    operator: operators.LESS_THAN_OR_EQUAL_TO,
    path: paths.productOffers.expirationDate,
    description: 'Expiration To',

    toFilter: function (values) {
      return {
        operator: this.operator,
        path: this.path,
        values: [{ value: moment(values).format(), description: moment(values.toString()).format(dateFormat) }],
      }
    },

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

    toFormik: function ({ values }) {
      return values[0].value.toString()
    }
  },
}