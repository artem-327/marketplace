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
  search: { getFilter: (values) => ({ operator: operators.LIKE, path: 'ProductOffer.product.productName', values }) },
  quantityFrom: { getFilter: (values) => ({ operator: operators.GREATER_THAN_OR_EQUAL_TO, path: 'ProductOffer.quantity', values }) },
  quantityTo: { getFilter: (values) => ({ operator: operators.LESS_THAN_OR_EQUAL_TO, path: 'ProductOffer.quantity', values }) },
  priceFrom: { getFilter: (values) => ({ operator: operators.GREATER_THAN_OR_EQUAL_TO, path: 'ProductOffer.pricingPrice', values }) },
  priceTo: { getFilter: (values) => ({ operator: operators.LESS_THAN_OR_EQUAL_TO, path: 'ProductOffer.pricingPrice', values }) },
  packagingTypes: { getFilter: (values) => ({ operator: operators.EQUALS, path: 'ProductOffer.product.packagingType.id', values }), nested: true },
  productConditions: { getFilter: (values) => ({ operator: operators.EQUALS, path: 'ProductOffer.productCondition.id', values }), nested: true },
  productGrades: { getFilter: (values) => ({ operator: operators.EQUALS, path: 'ProductGrade.id', values }), nested: true },
  productForms: { getFilter: (values) => ({ operator: operators.EQUALS, path: 'ProductOffer.productForm.id', values }), nested: true },
  dateFrom:  { getFilter: (values) => ({ operator: operators.GREATER_THAN_OR_EQUAL_TO, path: 'ProductOffer.expirationDate', values }) },
  dateTo:  { getFilter: (values) => ({ operator: operators.LESS_THAN_OR_EQUAL_TO, path: 'ProductOffer.expirationDate', values }) },
  assayFrom:  { getFilter: (values) => ({ operator: operators.GREATER_THAN_OR_EQUAL_TO, path: 'ProductOffer.assayMin', values }) },
  assayTo:  { getFilter: (values) => ({ operator: operators.LESS_THAN_OR_EQUAL_TO, path: 'ProductOffer.assayMax', values }) },
}