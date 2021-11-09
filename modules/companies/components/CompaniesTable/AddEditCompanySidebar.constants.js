/**
 * @category Companies/Companies
 * @constant {object}
 */
export const INITIAL_FORM_VALUES = {
  name: '',
  enabled: false,
  phone: '',
  purchaseHazmatEligible: false,
  businessType: {
    id: ''
  },
  tinType: '',
  tin: '',
  type: '',
  associations: [],
  cin: '',
  dba: '',
  dunsNumber: '',
  naicsCode: '',
  industryType: '',
  socialFacebook: '',
  socialInstagram: '',
  socialLinkedin: '',
  socialTwitter: '',
  website: '',
  tagline: '',
  primaryUser: {
    name: '',
    email: '',
    jobTitle: '',
    phone: ''
  },
  primaryBranch: {
    deliveryAddress: {
      addressName: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      address: {
        streetAddress: '',
        country: '',
        province: '',
        city: '',
        zip: ''
      }
    },
    warehouse: false
  },
  mailingBranch: {
    deliveryAddress: {
      addressName: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      address: {
        streetAddress: '',
        country: '',
        province: '',
        city: '',
        zip: ''
      }
    },
    warehouse: false
  }
}