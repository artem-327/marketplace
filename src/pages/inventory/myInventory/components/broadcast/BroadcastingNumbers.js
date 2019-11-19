import React from 'react'
import Spinner from '../../../../../components/Spinner/Spinner'
import {Icon} from 'semantic-ui-react'

const BroadcastingNumbers = ({storedOffices, convertObjectToArray}) => {
  if (!storedOffices) return <Spinner />
  const brcOffices = convertObjectToArray(storedOffices)
  const broadcastingTo = brcOffices.filter(i => i.broadcast === true).length
  return (
    <>
      <Icon name='info' circular />
      <span>
        Broadcasting to:{' '}
        <b>
          {broadcastingTo}/{brcOffices.length}
        </b>
      </span>
    </>
  )
}

export default BroadcastingNumbers
