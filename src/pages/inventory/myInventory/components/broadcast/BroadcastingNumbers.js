import React from 'react';
import Spinner from '../../../../../components/Spinner/Spinner'

const BroadcastingNumbers = ({storedOffices, convertObjectToArray}) => {
  if(!storedOffices) return  <Spinner />
  const brcOffices = convertObjectToArray(storedOffices)
  const broadcastingTo = brcOffices.filter(i => i.broadcast === true).length
  return (
    <div className="broadcasting-info">
    <i className="fas fa-info-circle" />
    <span>
      Broadcasting to: <b>{broadcastingTo}/{brcOffices.length}</b>
    </span>
  </div>
  );
};

export default BroadcastingNumbers;