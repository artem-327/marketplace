/**
 * country keys in the map below are in the form of alpha2 country codes
 */

export const brnValidationRules = {
  ca: {
    provinces: {
      52: {
        name: 'Alberta',
        validations: [
          '[a-z0-9]{8}',
          '[a-z0-9]{9}',
          '[a-z0-9]{10}'
        ],
        message: 'Please enter exactly 8, 9 or 10 alphanumeric characters'
      },
      53: {
        name: 'British Columbia',
        validations: [
          '[a-z0-9]{7}',
          '[a-z0-9]{8}',
          '[a-z0-9]{9}',
          '[a-z0-9]{15}',
        ],
        message: 'Please enter exactly 7, 8, 9 or 15 alphanumeric characters'
      },
      54: {
        name: 'Manitoba',
        validations: [
          '[a-z0-9]{5}',
          '[a-z0-9]{6}',
          '[a-z0-9]{7}',
          '[a-z0-9]{8}',
          '[a-z0-9]{15}',
        ],
        message: 'Please enter exactly 5, 6, 7, 8 or 15 alphanumeric characters'
      },
      55: {
        name: 'New Brunswick',
        validations: [
          '[a-z0-9]{5}',
          '[a-z0-9]{6}',
        ],
        message: 'Please enter exactly 5 or 6 alphanumeric characters'
      },
      56: {
        name: 'Newfoundland and Labrador',
        validations: [
          '[a-z0-9]{5}',
          '[a-z0-9]{6}',
        ],
        message: 'Please enter exactly 5 or 6 alphanumeric characters'
      },
      57: {
        name: 'Nova Scotia',
        validations: [
          '[a-z0-9]{7}',
        ],
        message: 'Please enter exactly 7 alphanumeric characters'
      },
      58: {
        name: 'Ontario',
        validations: [
          '[a-z0-9]{7}',
          '[a-z0-9]{8}',
          '[a-z0-9]{10}',
        ],
        message: 'Please enter exactly 7, 8 or 10 alphanumeric characters'
      },
      59: {
        name: 'Prince Edward',
        validations: [
          '[a-z0-9]{6}',
          '[a-z0-9]{9}',
          '[a-z0-9]{16}',
        ],
        message: 'Please enter exactly 6, 9 or 16 alphanumeric characters'
      },
      60: {
        name: 'Quebec',
        validations: [
          '[a-z0-9]{7}',
          '[a-z0-9]{8}',
          '[a-z0-9]{10}',
        ],
        message: 'Please enter exactly 7, 8 or 10 alphanumeric characters'
      },
      61: {
        name: 'Saskatchewan',
        validations: [
          '[a-z0-9]{6}',
          '[a-z0-9]{7}',
          '[a-z0-9]{8}',
          '[a-z0-9]{9}',
          '[a-z0-9]{10}',
        ],
        message: 'Please enter exactly 6, 7, 8, 9 or 10 alphanumeric characters'
      },
      62: {
        name: 'Northwest Territories',
        validations: [
          '[a-z0-9]{8}'
        ],
        message: 'Please enter exactly 8 alphanumeric characters'
      },
      63: {
        name: 'Nunavut',
        validations: [
          '[a-z0-9]{4}'
        ],
        message: 'Please enter exactly 4 alphanumeric characters'
      },
      64: {
        name: 'Yukon',
        validations: [
          '[a-z0-9]{6}'
        ],
        message: 'Please enter exactly 6 alphanumeric characters'
      },
    }
  }
}
