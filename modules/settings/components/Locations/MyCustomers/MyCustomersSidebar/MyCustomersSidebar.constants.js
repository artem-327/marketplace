
export const INITIAL_VALUES = {
  name: '',
  warehouseAddresses: [],
  billToAddress: {
    address: {
      city: '',
      country: '',
      province: '',
      streetAddress: '',
      zip: ''
    },
    addressName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    readyTime: null,
    closeTime: null,
    liftGate: false,
    forkLift: false,
    callAhead: false,
    deliveryNotes: ''
  }
}

export const INIT_VALUES_WAREHOUSE = {
  address: {
    city: '',
    country: '',
    province: '',
    streetAddress: '',
    zip: ''
  },
  addressName: '',
  callAhead: false,
  closeTime: '',
  contactEmail: '',
  contactName: '',
  contactPhone: '',
  deliveryNotes: '',
  forkLift: false,
  liftGate: false,
  readyTime: ''
}