import * as Yup from 'yup'

export const initialValues = {
  checkboxes: {
    automaticallyApply: true,
    notifyMail: false,
    notifyPhone: false,
    notifySystem: false
  },
  notifications: {
    notificationMail: null,
    notificationPhone: null
  }
}