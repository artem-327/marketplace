import { debounce } from 'lodash'
import {getDeliveryAddresses, getWarehouses} from "../../actions";

/**
 * @param {object} props - { values, setValues, setFieldTouched, closeTdsModal }
 * @param {string} template - Stringified JSON - Array of objects {property, specifications, testMethods}
 */

export const searchAddress = debounce (props => {
  try {
    if (props.searchValue) {
      props.searchDeliveryAddresses(props.searchValue)
      props.searchWarehouses(props.searchValue)
    } else {
      props.getDeliveryAddresses()
      props.getWarehouses()
    }
  } catch (e) {
    console.error(e)
  }
}, 250)