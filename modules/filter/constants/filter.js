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

export const datagridValues = {
  search: {
    getFilter: (values) => ({
      operator: operators.LIKE,
      path: 'ProductOffer.product.productName',
      values,
      description: 'Chemical Name',
      valuesDescription: values.toString()
    })
  },
  quantityFrom: {
    getFilter: (values) => ({
      operator: operators.GREATER_THAN_OR_EQUAL_TO,
      path: 'ProductOffer.quantity',
      values,
      description: 'Quantity From',
      valuesDescription: values.toString()
    })
  },
  quantityTo: {
    getFilter: (values) => ({
      operator: operators.LESS_THAN_OR_EQUAL_TO,
      path: 'ProductOffer.quantity',
      values,
      description: 'Quantity To',
      valuesDescription: values.toString()
    })
  },
  priceFrom: {
    getFilter: (values) => ({
      operator: operators.GREATER_THAN_OR_EQUAL_TO,
      path: 'ProductOffer.pricingPrice',
      values,
      description: 'Price From',
      valuesDescription: values.toString()
    })
  },
  priceTo: {
    getFilter: (values) => ({
      operator: operators.LESS_THAN_OR_EQUAL_TO,
      path: 'ProductOffer.pricingPrice',
      values,
      description: 'Price To',
      valuesDescription: values.toString()
    })
  },
  packagingTypes: {
    getFilter: (values, valuesDescription) => ({
      operator: operators.EQUALS,
      path: 'ProductOffer.product.packagingType.id',
      values,
      description: 'Packaging Types',
      valuesDescription
    }), nested: true
  },
  productConditions: {
    getFilter: (values, valuesDescription) => ({
      operator: operators.EQUALS,
      path: 'ProductOffer.productCondition.id',
      values,
      description: 'Product Conditions',
      valuesDescription
    }), nested: true
  },
  productGrades: {
    getFilter: (values, valuesDescription) => ({
      operator: operators.EQUALS,
      path: 'ProductGrade.id',
      values,
      description: 'Product Grades',
      valuesDescription
    }), nested: true
  },
  productForms: {
    getFilter: (values, valuesDescription) => ({
      operator: operators.EQUALS,
      path: 'ProductOffer.productForm.id',
      values,
      description: 'Product Forms',
      valuesDescription
    }), nested: true
  },
  dateFrom: {
    getFilter: (values) => ({
      operator: operators.GREATER_THAN_OR_EQUAL_TO,
      path: 'ProductOffer.expirationDate',
      values: [moment(values).format()],
      description: 'Expiration From',
      valuesDescription: values.toString()
    })
  },
  dateTo: {
    getFilter: (values) => ({
      operator: operators.LESS_THAN_OR_EQUAL_TO,
      path: 'ProductOffer.expirationDate',
      values: [moment(values).format()],
      description: 'Expiration To',
      valuesDescription: values.toString()
    })
  },
  assayFrom: {
    getFilter: (values) => ({
      operator: operators.GREATER_THAN_OR_EQUAL_TO,
      path: 'ProductOffer.assayMin',
      values,
      description: 'Assay Min.',
      valuesDescription: values.toString()
    })
  },
  assayTo: {
    getFilter: (values) => ({
      operator: operators.LESS_THAN_OR_EQUAL_TO,
      path: 'ProductOffer.assayMax',
      values,
      description: 'Assay Max.',
      valuesDescription: values.toString()
    })
  },
}