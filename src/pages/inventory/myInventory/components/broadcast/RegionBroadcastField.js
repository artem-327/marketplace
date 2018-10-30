import React from 'react';
import BroadcastField from "./BroadcastField";
import StateBroadcastField from "./StateBroadcastField";

const RegionBroadcastField = ({name, id, dispatch, showSubordinateItems, regionDetail, regionIsFetching, stateDetail, regionIsExpanded, stateIsExpanded, isList}) => {
  return (
    <React.Fragment>
      <BroadcastField
        name={name}
        type="region"
        showSubordinateItems={showSubordinateItems}
        dispatch={dispatch}
        isList={isList}
        id={id}
        isExpanded={regionIsExpanded}
      />

      {!regionIsFetching && regionIsExpanded && regionDetail.countries && regionDetail.countries.map(i => {
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