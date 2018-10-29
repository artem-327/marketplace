import React from 'react';
import BroadcastField from "./BroadcastField";
import StateBroadcastField from "./StateBroadcastField";

const RegionBroadcastField = ({dispatch, showSubordinateItems, regionDetail, stateDetail, regionIsExpanded, stateIsExpanded, isList}) => {
  return (
    <React.Fragment>
      <BroadcastField
        name={regionDetail.name}
        type="region"
        showSubordinateItems={showSubordinateItems}
        dispatch={dispatch}
        isList={isList}
        id={regionDetail.id}
        isExpanded={regionIsExpanded}
      />
      {regionIsExpanded && regionDetail.states.map(i => {
        return <StateBroadcastField
        name={i.name}
        type="state"
        stateDetail={stateDetail}
        stateIsExpanded={stateIsExpanded === i.id}
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

export default RegionBroadcastField;