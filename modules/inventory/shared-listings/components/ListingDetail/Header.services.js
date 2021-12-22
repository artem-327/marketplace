// Services
import { removeEmpty } from '../../../../../utils/functions'
import { getFloatValue } from '../../../../../utils/functions'

/**
 * Submit Handler in ListingDetail Header
 * @category Inventory - Shared Listings
 * @method
 */
export const submitHandler = async (values, props) => {
  const { updateMarkUp, getSharedProductOffer, datagrid } = props

  try {
    let body = {
      priceAddition: values.priceAddition,
      priceMultiplier: getFloatValue(values.priceMultiplier),
      priceOverride: values.priceOverride
    }

    console.log('!!!!!!!!!! submitHandler values', values)
    removeEmpty(body, val => val === 0)
    console.log('!!!!!!!!!! submitHandler body', body)

    // ! ! await updateMarkUp(values.id, body)
  } catch (e) {
    console.error(e)
  }

  try {
    /* // ! !
    const { value } = await getSharedProductOffer(values.id)
    if (value && value.length) {
      datagrid.updateRow(values.id, () => value[0])
    }
    */
  } catch (e) {
    console.error(e)
  }
}

