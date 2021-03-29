export const submitHandler = (values, actions, customerId) => {
  if (customerId) {
    actions.editCustomer(values)
  } else {
    actions.addCustomer(values)
  }
}