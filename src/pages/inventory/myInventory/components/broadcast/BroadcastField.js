import React from "react";
import PropTypes from "prop-types";
import { Control } from "react-redux-form";
import CheckboxBroadcastRedux from "../../../../../components/Checkbox/CheckboxBroadcastRedux";
import RadioBroadcastRedux from "../../../../../components/Radio/RadioBroadcastRedux";
import SwitcherRedux from "../../../../../components/Switcher/SwitcherRedux";
import { isNumber } from "../../../../../utils/validation";


const BroadcastField = ({ partlyBrc, partlyAnonym, name, id, type, isClientList, handleExpanded, handleRuleClick, isExpanded, hasChildren }) => {
    return (
      <div className={`broadcast-field ${type} ${isClientList ? "client-list" : "price-list"}`}>
        <div className="field-name" name={type} id={id} onClick={e => handleExpanded(e)}>
          {hasChildren && !isExpanded && <i className="fas fa-angle-right" />}
          {hasChildren && isExpanded && <i className="fas fa-angle-down" />} 
          {name}
        </div>
        {isClientList 
        ? (
          <div className="list-rules">
            <SwitcherRedux
              model={`.${type}[${id}].broadcast`}
              id={id}
              isrounded
              partlyBrc={partlyBrc}
              onClick={handleRuleClick}
            />
            <CheckboxBroadcastRedux
              id={id}
              model={`.${type}[${id}].anonymous`}
              onClick={handleRuleClick}
              partlyAnonym={partlyAnonym}
            />
          </div>
        ) 
        : (
          <div className="price-rules">
            <Control.text
              model={`.${type}[${id}].priceValue`}
              className="price-value"
              validators={{ isNumber }}
              onChange={e => handleRuleClick(e)}
              id={id}
            />
            <div className="price-units">     
                <RadioBroadcastRedux model={`.${type}[${id}].priceUnit`} label="$" value="$" onClick={handleRuleClick} id={id}/>       
                <RadioBroadcastRedux model={`.${type}[${id}].priceUnit`} label="%" value="%" onClick={handleRuleClick} id={id}/>                      
            </div>
          </div>
        )}
      </div>
    );
  };

  export default BroadcastField;

  BroadcastField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    dispatch: PropTypes.func,
    isClientList: PropTypes.bool,
  }
  