import moment from 'moment'
import { FormattedNumber, FormattedDate } from 'react-intl'
import { getLocaleDateFormat } from '~/components/date-format'

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
  INVENTORY: 'inventory',
  MARKETPLACE: 'marketplace',
  PURCHASE_ORDERS: 'PURCHASE_ORDERS',
  SALES_ORDERS: 'SALES_ORDERS'
}

export const filterPresets = {
  INVENTORY_MARKETPLACE: 'INVENTORY_MARKETPLACE',
  ORDERS: 'ORDERS'
}

export const paths = {
  productOffers: {
    productId: 'ProductOffer.companyProduct.id',
    marketplaceProductId: 'ProductOffer.companyProduct.echoProduct.id',
    quantity: 'ProductOffer.quantity',
    price: 'ProductOffer.cfPricePerUOM',
    packagingTypes: 'ProductOffer.companyProduct.packagingType.id',
    productConditions: 'ProductOffer.condition.id',
    productGrade: 'ProductGrade.id',
    productForms: 'ProductOffer.form.id',
    expirationDate: 'ProductOffer.lotExpirationDate',
    assayFrom: 'ProductOffer.assayMin',
    assayTo: 'ProductOffer.assayMax',
    manufacturedDate: 'ProductOffer.lotManufacturedDate',
    warehouseId: 'ProductOffer.warehouse.id',
    manufacturerId: 'ProductOffer.companyProduct.echoProduct.manufacturer.id',
    broadcast: 'ProductOffer.broadcasted',
    origin: 'ProductOffer.origin.id',
    expiration: 'ProductOffer.lotExpirationDate',
    mfg: 'ProductOffer.lotManufacturedDate'
  },
  orders: {
    orderDate: 'Order.orderDate',
    vendorPurchase: 'Order.sellerCompanyName',
    vendorSales: 'Order.buyerCompanyName'
  },
  casProduct: {
    id: 'CasProduct.id'
  }
}

export const dateDropdownOptions = [
  { key: 0, value: 'From', text: 'More Than' },
  { key: 1, value: 'To', text: 'Less Than' }
]

export const dateFormat = getLocaleDateFormat()

export const replaceAmbigiousCharacters = text =>
  text
    .toLowerCase()
    .replace(/ /g, '')
    .replace(/\//g, '')
    .replace(/-/g, '')

const checkboxesToFormik = (values, checkboxes) => {
  let obj = {}
  let tmp = values.map(val => checkboxes.find(ch => ch.id === parseInt(val.value)))

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
  warehouse: {
    paths: [paths.productOffers.warehouseId],
    description: 'Warehouse',
    operator: operators.EQUALS,

    toFilter: function(values) {
      let data
      if (Array.isArray(values)) {
        data = values.map(val => {
          let parsed = JSON.parse(val)
          return {
            value: parsed.id,
            //description: parsed.name
            description: JSON.stringify({
              name: parsed.name,
              text: parsed.text
            })
          }
        })
      } else {
        let parsed = JSON.parse(values)
        data = [
          {
            value: parsed.id,
            description: JSON.stringify({
              name: parsed.name,
              text: parsed.text
            })
          }
        ]
      }

      return {
        operator: this.operator,
        path: this.paths[0],
        values: data,
        description: this.description
      }
    },

    valuesDescription: function(values) {
      return values.map(val => {
        try {
          return JSON.parse(val.description).text
        } catch {
          return val.description
        }
      })
    },

    tagDescription: function(values) {
      return `Warehouse: ${this.valuesDescription(values)[0]}`
    },

    toFormik: function({ values }) {
      let parsed = JSON.parse(values[0].description)
      return JSON.stringify({
        id: parseInt(values[0].value),
        text: parsed.text
      })
    }
  },

  search: {
    paths: [paths.productOffers.productId, paths.casProduct.id],
    description: 'Chemical Name',
    operator: operators.EQUALS,

    toFilter: function(values, filterType = filterTypes.INVENTORY) {
      let modifiedValues = values.map(val => {
        let parsed = JSON.parse(val)

        return {
          value: parsed.id,
          description: JSON.stringify({
            name: parsed.name,
            casNumberCombined: parsed.casNumber || null
          })
        }
      })

      switch (filterType) {
        case filterTypes.INVENTORY: {
          var path = paths.productOffers.productId
          break
        }

        case filterTypes.MARKETPLACE: {
          var path = paths.productOffers.marketplaceProductId
          break
        }

        default:
          break
      }

      return {
        operator: this.operator,
        path,
        values: modifiedValues,
        description: this.description
      }
    },

    valuesDescription: function(values, params) {
      return values.map(val => {
        let parsed = JSON.parse(val.description)
        if (parsed.casNumberCombined) var text = `${parsed.name} (${parsed.casNumberCombined})`
        else var text = parsed.name

        return text
      })
    },

    tagDescription: function(values) {
      return this.valuesDescription(values)
    },

    toFormik: function({ values }) {
      return values.map(val => {
        let parsed = JSON.parse(val.description)
        return JSON.stringify({
          id: val.value,
          name: parsed.name,
          casNumber: parsed.casNumberCombined || null
        })
      })
    }
  },

  quantityFrom: {
    paths: [paths.productOffers.quantity],
    description: 'Quantity From',
    operator: operators.GREATER_THAN_OR_EQUAL_TO,

    toFilter: function(values) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: values, description: values }],
        description: this.description
      }
    },

    tagDescription: values => `>= ${values[0].description} pckgs`,

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    toFormik: function({ values }) {
      return values[0].value.toString()
    }
  },

  quantityTo: {
    paths: [paths.productOffers.quantity],
    description: 'Quantity To',
    operator: operators.LESS_THAN_OR_EQUAL_TO,

    toFilter: function(values) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: values, description: values }],
        description: this.description
      }
    },

    tagDescription: values => `<= ${values[0].description} pckgs`,

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    toFormik: function({ values }) {
      return values[0].value.toString()
    }
  },

  priceFrom: {
    paths: [paths.productOffers.price],
    description: 'Price From',
    operator: operators.GREATER_THAN_OR_EQUAL_TO,

    toFilter: function(values) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: values, description: values }],
        description: this.description
      }
    },

    tagDescription: (values, { currencyCode } = '$') => (
      <label>{<FormattedNumber style='currency' currency={currencyCode} value={values[0].description} />}</label>
    ),

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    toFormik: function({ values }) {
      return values[0].value.toString()
    }
  },
  priceTo: {
    paths: [paths.productOffers.price],
    description: 'Price To',
    operator: operators.LESS_THAN_OR_EQUAL_TO,

    toFilter: function(values) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: values, description: values }],
        description: this.description
      }
    },

    tagDescription: (values, { currencyCode } = '$') => (
      <label>{<FormattedNumber style='currency' currency={currencyCode} value={values[0].description} />}</label>
    ),

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    toFormik: function({ values }) {
      return values[0].value.toString()
    }
  },
  packagingTypes: {
    paths: [paths.productOffers.packagingTypes],
    description: 'Packaging Types',
    operator: operators.EQUALS,

    toFilter: function(values, valuesDescription) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: values.map((val, i) => ({
          value: val,
          description: valuesDescription[i]
        }))
      }
    },

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    tagDescription: function(values) {
      return this.valuesDescription(values)
    },

    toFormik: function({ values }, packagingTypes) {
      return checkboxesToFormik(values, packagingTypes)
    },

    nested: true
  },
  productConditions: {
    paths: [paths.productOffers.productConditions],
    description: 'Product Conditions',
    operator: operators.EQUALS,

    toFilter: function(values, valuesDescription) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: values.map((val, i) => ({
          value: val,
          description: valuesDescription[i]
        }))
      }
    },

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    tagDescription: function(values) {
      return this.valuesDescription(values)
    },

    toFormik: function({ values }, productConditions) {
      return checkboxesToFormik(values, productConditions)
    },

    nested: true
  },
  productGrade: {
    paths: [paths.productOffers.productGrade],
    description: 'Product Grades',
    operator: operators.EQUALS,

    toFilter: function(values, valuesDescription) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: values.map((val, i) => ({
          value: val,
          description: valuesDescription[i]
        }))
      }
    },

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    tagDescription: function(values) {
      return this.valuesDescription(values)
    },

    toFormik: function({ values }, productGrades) {
      return checkboxesToFormik(values, productGrades)
    },

    nested: true
  },
  productForms: {
    operator: operators.EQUALS,
    paths: [paths.productOffers.productForms],
    description: 'Product Forms',

    toFilter: function(values, valuesDescription) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: values.map((val, i) => ({
          value: val,
          description: valuesDescription[i]
        }))
      }
    },

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    tagDescription: function(values) {
      return this.valuesDescription(values)
    },

    toFormik: function({ values }, productForms) {
      return checkboxesToFormik(values, productForms)
    },

    nested: true
  },

  expirationFrom: {
    operator: operators.GREATER_THAN,
    paths: [paths.productOffers.expirationDate],
    description: 'Expiration From',

    toFilter: function(values) {
      let date = moment().add(values, 'days')
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: date.format(), description: date.format(dateFormat) }]
      }
    },

    tagDescription: values => `Expires > ${values[0].description}`,

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    toFormik: function({ values }) {
      const days = moment().diff(values[0].value, 'days') * -1 + 1
      return days
    }
  },
  expirationTo: {
    operator: operators.LESS_THAN,
    paths: [paths.productOffers.expirationDate],
    description: 'Expiration To',

    toFilter: function(values) {
      let date = moment().add(values, 'days')
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: date.format(), description: date.format(dateFormat) }]
      }
    },

    tagDescription: values => `Expires < ${values[0].description}`,

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    toFormik: function({ values }) {
      const days = moment().diff(values[0].value, 'days') * -1 + 1
      return days
    }
  },

  mfgFrom: {
    operator: operators.LESS_THAN,
    paths: [paths.productOffers.manufacturedDate],
    description: 'Manufactured Date From',

    toFilter: function(values) {
      let date = moment().subtract(values, 'days')
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: date.format(), description: date.format(dateFormat) }]
      }
    },

    tagDescription: values => `Manufactured > ${values[0].description}`,

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    toFormik: function({ values }) {
      const days = moment().diff(values[0].value, 'days')
      return days
    }
  },

  mfgTo: {
    operator: operators.GREATER_THAN,
    paths: [paths.productOffers.manufacturedDate],
    description: 'Manufactured Date To',

    toFilter: function(values) {
      let date = moment().subtract(values, 'days')
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: date.format(), description: date.format(dateFormat) }]
      }
    },

    tagDescription: values => `Manufactured < ${values[0].description}`,

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    toFormik: function({ values }) {
      const days = moment().diff(values[0].value, 'days')
      return days
    }
  },

  assayFrom: {
    operator: operators.GREATER_THAN_OR_EQUAL_TO,
    paths: [paths.productOffers.assayFrom],
    description: 'Assay Min.',

    toFilter: function(values) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: values, description: values }]
      }
    },

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    tagDescription: values => `Assay Min. ${values[0].description}%`,

    toFormik: function({ values }) {
      return values[0].value.toString()
    }
  },
  assayTo: {
    operator: operators.LESS_THAN_OR_EQUAL_TO,
    paths: [paths.productOffers.assayTo],
    description: 'Assay Max.',

    toFilter: function(values) {
      return {
        operator: this.operator,
        path: this.paths[0],
        values: [{ value: values, description: values }]
      }
    },

    valuesDescription: function(values) {
      return values.map(val => val.description)
    },

    tagDescription: values => `Assay Max. ${values[0].description}%`,

    toFormik: function({ values }) {
      return values[0].value.toString()
    }
  },
  orderFrom: {
    operator: operators.GREATER_THAN_OR_EQUAL_TO,
    paths: [paths.orders.orderDate],
    description: 'Order Date',

    valuesDescription: val => val,
    tagDescription: val => <FormattedDate value={val}>{text => `>= ${text}`}</FormattedDate>
  },

  orderTo: {
    operator: operators.LESS_THAN_OR_EQUAL_TO,
    paths: [paths.orders.orderDate],
    description: 'Order Date',

    valuesDescription: val => val,
    tagDescription: val => <FormattedDate value={val}>{text => `<= ${text}`}</FormattedDate>
  },

  vendor: {
    operator: operators.LIKE,
    paths: [paths.orders.vendorPurchase, paths.orders.vendorSales],
    description: 'Vendor',

    valuesDescription: val => val,
    tagDescription: val => `Vendor: ${val}`
  },

  manufacturer: {
    paths: [paths.productOffers.manufacturerId],
    description: 'Manufacturer',
    operator: operators.EQUALS,

    toFilter: function(values) {
      let data
      if (Array.isArray(values)) {
        data = values.map(val => {
          let parsed = JSON.parse(val)
          return {
            value: parsed.id,
            //description: parsed.name
            description: JSON.stringify({
              text: parsed.text
            })
          }
        })
      } else {
        let parsed = JSON.parse(values)
        data = [
          {
            value: parsed.id,
            description: JSON.stringify({
              text: parsed.text
            })
          }
        ]
      }

      return {
        operator: this.operator,
        path: this.paths[0],
        values: data,
        description: this.description
      }
    },

    valuesDescription: function(values) {
      return values.map(val => {
        try {
          return JSON.parse(val.description).text
        } catch {
          return val.description
        }
      })
    },

    tagDescription: function(values) {
      return `Manufacturer: ${this.valuesDescription(values)[0]}`
    },

    toFormik: function({ values }) {
      let parsed = JSON.parse(values[0].description)
      return JSON.stringify({
        id: parseInt(values[0].value),
        text: parsed.text
      })
    }
  },

  broadcast: {
    paths: [paths.productOffers.broadcast],
    description: 'Broadcast',
    operator: operators.EQUALS,

    toFilter: function(values) {
      const data = [
        {
          value: values
        }
      ]

      return {
        operator: this.operator,
        path: this.paths[0],
        values: data,
        description: this.description
      }
    },

    valuesDescription: function(values) {
      return values.map(val => {
        if (val.value) {
          return val.value === false || val.value === 'false'
            ? 'No'
            : val.value === true || val.value === 'true'
            ? 'Yes'
            : ''
        }
      })
    },

    tagDescription: function(values) {
      return `Broadcast: ${this.valuesDescription(values)[0]}`
    },

    toFormik: function({ values }) {
      const text =
        values[0].value === 'false' || values[0].value === false || values[0].value === 'No'
          ? false
          : values[0].value === 'true' || values[0].value === true || values[0].value === 'Yes'
          ? true
          : ''
      return text
    }
  },

  origin: {
    paths: [paths.productOffers.origin],
    description: 'Origin',
    operator: operators.EQUALS,

    toFilter: function(values) {
      let data
      if (Array.isArray(values)) {
        data = values.map(val => {
          let parsed = JSON.parse(val)
          return {
            value: parsed.id,
            //description: parsed.name
            description: JSON.stringify({
              text: parsed.text
            })
          }
        })
      } else {
        let parsed = JSON.parse(values)
        data = [
          {
            value: parsed.id,
            description: JSON.stringify({
              text: parsed.text
            })
          }
        ]
      }

      return {
        operator: this.operator,
        path: this.paths[0],
        values: data,
        description: this.description
      }
    },

    valuesDescription: function(values) {
      return values.map(val => {
        try {
          return JSON.parse(val.description).text
        } catch {
          return val.description
        }
      })
    },

    tagDescription: function(values) {
      return `Origin: ${this.valuesDescription(values)[0]}`
    },

    toFormik: function({ values }) {
      let parsed = JSON.parse(values[0].description)
      return JSON.stringify({
        id: parseInt(values[0].value),
        text: parsed.text
      })
    }
  },

  expiration: {
    paths: [paths.productOffers.expiration],
    description: 'Expiration',

    toFilter: function(values) {
      const data = [
        {
          value: values
        }
      ]

      return {
        path: this.paths[0],
        values: data,
        description: this.description
      }
    },
    toFormik: function(operator) {
      let result
      if (operator === 'LESS_THAN') {
        result = 'To'
      } else if (operator === 'GREATER_THAN') {
        result = 'From'
      }
      return result
    }
  },

  mfg: {
    paths: [paths.productOffers.mfg],
    description: 'Mfg',
    toFilter: function(values) {
      const data = [
        {
          value: values
        }
      ]

      return {
        path: this.paths[0],
        values: data,
        description: this.description
      }
    },
    toFormik: function(operator) {
      let result = null
      if (operator === 'LESS_THAN') {
        result = 'From'
      } else if (operator === 'GREATER_THAN') {
        result = 'To'
      }
      return result
    }
  }
}

// export const orderFilterDescription = values => {
//   for (let [key, value] of Object.entries(values)) {
//     switch(key) {
//       case 'orderFrom': {

//       }
//     }
//   }
//   // Object.entries(values).forEach((key, value) => {
//   //   console.log({ value })
//   // })

//   return values
// }

export const groupFilters = (appliedFilters, { currencyCode } = '$') => {
  let groups = [
    {
      description: 'Quantity',
      from: {
        path: paths.productOffers.quantity,
        operator: operators.GREATER_THAN_OR_EQUAL_TO
      },
      to: {
        path: paths.productOffers.quantity,
        operator: operators.LESS_THAN_OR_EQUAL_TO
      },
      tagDescription: (from, to) => {
        let sign = from && !to ? '≥ ' : !from && to ? '≤ ' : null
        let dash = from && to ? ' - ' : null
        return (
          <label>
            {from ? (
              <>
                {sign} {from}
              </>
            ) : null}
            {to ? (
              <>
                {dash} {sign} {to}
              </>
            ) : null}
            {' pkgs'}
          </label>
        )
      }
    },
    {
      description: 'Price',
      from: {
        path: paths.productOffers.price,
        operator: operators.GREATER_THAN_OR_EQUAL_TO
      },
      to: {
        path: paths.productOffers.price,
        operator: operators.LESS_THAN_OR_EQUAL_TO
      },
      tagDescription: (from, to) => {
        let sign = from && !to ? '≥ ' : !from && to ? '≤ ' : null
        let dash = from && to ? ' - ' : null
        return (
          <label>
            {from ? (
              <>
                {sign}
                <FormattedNumber style='currency' currency={currencyCode} value={from} />
              </>
            ) : null}
            {to ? (
              <>
                {dash}
                {sign}
                <FormattedNumber style='currency' currency={currencyCode} value={to} />
              </>
            ) : null}
          </label>
        )
      }
    },
    {
      description: 'Assay',
      from: {
        path: paths.productOffers.assayFrom,
        operator: operators.GREATER_THAN_OR_EQUAL_TO
      },
      to: {
        path: paths.productOffers.assayTo,
        operator: operators.LESS_THAN_OR_EQUAL_TO
      },
      tagDescription: (from, to) => {
        let sign = from && !to ? '≥ ' : !from && to ? '≤ ' : null
        let dash = from && to ? ' - ' : null
        return (
          <label>
            {from ? (
              <>
                {sign} {from}
              </>
            ) : null}
            {to ? (
              <>
                {dash} {sign} {to}
              </>
            ) : null}
            {'%'}
          </label>
        )
      }
    },
    {
      description: 'Order Date',
      from: {
        path: paths.orders.orderDate,
        operator: operators.GREATER_THAN_OR_EQUAL_TO
      },
      to: {
        path: paths.orders.orderDate,
        operator: operators.LESS_THAN_OR_EQUAL_TO
      },
      tagDescription: (from, to) => {
        let sign = from && !to ? '≥ ' : !from && to ? '≤ ' : null
        let dash = from && to ? ' - ' : null
        return (
          <label>
            {from ? (
              <>
                {sign}
                <FormattedDate value={from}>{text => text}</FormattedDate>
              </>
            ) : null}
            {to ? (
              <>
                {dash}
                {sign}
                <FormattedDate value={to}>{text => text}</FormattedDate>
              </>
            ) : null}
          </label>
        )
      }
    }

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

  let results = [],
    indexes = []

  groups.forEach(group => {
    let from = filters.findIndex(el => el.operator === group.from.operator && el.path === group.from.path)
    let to = filters.findIndex(el => el.operator === group.to.operator && el.path === group.to.path)

    if (from !== -1 || to !== -1) {
      let valuesDescription
      let tagDescription
      let indexesResult
      if (from !== -1 && to !== -1) {
        valuesDescription = `${filters[from].valuesDescription.toString()} - ${filters[
          to
        ].valuesDescription.toString()}`
        tagDescription = group.tagDescription(
          filters[from].valuesDescription.toString(),
          filters[to].valuesDescription.toString()
        )
        indexesResult = [from, to]
        indexes.push(from, to)
      } else if (from !== -1 && to === -1) {
        valuesDescription = `${filters[from].valuesDescription.toString()} `
        tagDescription = group.tagDescription(filters[from].valuesDescription.toString())
        indexesResult = [from]
        indexes.push(from)
      } else if (from === -1 && to !== -1) {
        valuesDescription = `${filters[to].valuesDescription.toString()}`
        tagDescription = group.tagDescription(null, filters[to].valuesDescription.toString())
        indexesResult = [to]
        indexes.push(to)
      }

      results.push({
        description: group.description,
        valuesDescription: valuesDescription,
        tagDescription: tagDescription,
        indexes: indexesResult
      })
    }
  })

  // Take rest elements (those who aren't grouped) and push them to array
  filters.forEach((filter, i) => {
    if (!indexes.includes(i)) {
      let description = ''
      if (filter.description === 'Chemical Name') {
        description =
          filter && filter.values[i] && filter.values[i].description && JSON.parse(filter.values[i].description).name
      } else {
        description = filter && filter.tagDescription && filter.tagDescription.toString()
      }

      results.push({
        description: filter && filter.description,
        valuesDescription: filter && filter.valuesDescription && filter.valuesDescription.toString(),
        tagDescription: description,
        indexes: [i]
      })
    }
  })

  return results
}
