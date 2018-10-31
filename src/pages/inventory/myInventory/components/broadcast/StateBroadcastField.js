import React from 'react';
import BroadcastField from "./BroadcastField";
import Spinner from '../../../../../components/Spinner/Spinner'
const StateBroadcastField = ({dispatch, showSubordinateItems, name, id, stateDetail, stateDetailIsFetching, stateIsExpanded, isList}) => {
  return (
    <React.Fragment>
      <BroadcastField
        name={name || stateDetail.name}
        type="state"
        showSubordinateItems={showSubordinateItems}
        dispatch={dispatch}
        isList={isList}
        id={id || stateDetail.id}
        isExpanded={stateIsExpanded}
      />
      {stateDetailIsFetching && stateIsExpanded && <Spinner />}
      {!stateDetailIsFetching && stateIsExpanded && stateDetail.companies && stateDetail.companies.map(i => {
        return <BroadcastField
        name={i.name}
        type="company"
        showSubordinateItems={showSubordinateItems}
        dispatch={dispatch}
        isList={isList}
        id={i.id}
        key={i.id}
      />
      })}
    </React.Fragment>
  );
};

export default StateBroadcastField;