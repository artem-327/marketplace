import React from 'react';
import BroadcastField from "./BroadcastField";
import RegionBroadcastField from "./RegionBroadcastField";

const RouteBroadcastField = ({broadcastData, name, id, dispatch, showSubordinateItems, rootIsExpanded, isList}) => {
  return (
    <>
      <BroadcastField
        name={name}
        type="root"
        showSubordinateItems={showSubordinateItems}
        dispatch={dispatch}
        isList={isList}
        id={id}
        isExpanded={rootIsExpanded}
      />

      {rootIsExpanded && broadcastData.root.regions.map(i => {
        return <RegionBroadcastField
        name={i.name}
        type="region"
        dispatch={dispatch}
        isList={isList}
        id={i.id}
        key={i.id}
      />
      })}
    </>
  );
};

export default RouteBroadcastField;
