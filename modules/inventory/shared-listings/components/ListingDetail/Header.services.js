import { removeEmpty } from '../../../../../utils/functions'

export const submitHandler = async (values, props) => {
  const { updateMarkUp, getSharedProductOffer, datagrid } = props

  try {
    let body = {
      priceAddition: values.priceAddition,
      priceMultiplier: parseFloat(values.priceMultiplier),
      priceOverride: values.priceOverride
    }

    removeEmpty(body, val => val === 0)
    await updateMarkUp(values.id, body)
  } catch (e) {
    console.error(e)
  }

  try {
    const { value } = await getSharedProductOffer(values.id)
    if (value && value.length) {
      datagrid.updateRow(values.id, () => value[0])
    }
  } catch (e) {
    console.error(e)
  }
}
