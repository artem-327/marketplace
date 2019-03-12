import React from "react";
import PropTypes from "prop-types";
import { Control } from "react-redux-form";
import CheckboxBroadcastRedux from "../../../../../components/Checkbox/CheckboxBroadcastRedux";
import RadioBroadcastRedux from "../../../../../components/Radio/RadioBroadcastRedux";
import SwitcherRedux from "../../../../../components/Switcher/SwitcherRedux";
import { isNumber } from "../../../../../utils/validation";


const BroadcastField = ({ 
  partlybrc, 
  partlyanonym, 
  name, 
  id, 
  type, 
  isFiltering, 
  isClientList, 
  handleExpanded, 
  handleRuleClick, 
  isExpanded, 
  hasChildren 
}) => {
    return (
      <div className={`broadcast-field ${type} ${isClientList ? "client-list" : "price-list"}`}>
        <div className={`field-name ${isFiltering || !hasChildren || type ==="root" ? "" : "pointer"}`} name={type} id={id} onClick={e => handleExpanded(e)}>
          {hasChildren && type !=="root" && !isFiltering && !isExpanded && <i className="fas fa-chevron-right" name={type} id={id} onClick={e => handleExpanded(e)}/>}
          {hasChildren && type !=="root" && !isFiltering && isExpanded && <i className="fas fa-chevron-down" name={type} id={id} onClick={e => handleExpanded(e)}/>} 
          {name}
        </div>
        {isClientList 
        ? (
          <div className="list-rules">
            <SwitcherRedux
              model={`.${type}[${id}].broadcast`}
              id={id}
              isrounded={1}
              partlybrc={partlybrc ? 1 : 0} //to prevent reactDom warnings
              onClick={handleRuleClick}
            />
            <CheckboxBroadcastRedux
              id={id}
              model={`.${type}[${id}].anonymous`}
              onClick={handleRuleClick}
              partlyanonym={partlyanonym ? 1 : 0}
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
  