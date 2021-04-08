import { removeEmpty } from '../../../../../utils/functions'

export const submitHandler = async (values, props) => {
  let body = {
    priceAddition: values.priceAddition,
    priceMultiplier: parseFloat(values.priceMultiplier),
    priceOverride: values.priceOverride
  }

  removeEmpty(body, val => val === 0)
  await props.updateMarkUp(values.id, body)
}
