import React from "react";
import PropTypes from "prop-types";
import { Control } from "react-redux-form";
import CheckboxBroadcastRedux from "../../../../../components/Checkbox/CheckboxBroadcastRedux";
import RadioBroadcastRedux from "../../../../../components/Radio/RadioBroadcastRedux";
import SwitcherRedux from "../../../../../components/Switcher/SwitcherRedux";
import { isNumber } from "../../../../../utils/validation";


const BroadcastField = ({ name, id, type, isList, showSubordinateItems }) => {
    return (
      <div className={`broadcast-field ${type}`}>
        <div className="field-name" name={type} id={id} onClick={(e) => showSubordinateItems(e)}>
          <i className="fas fa-angle-right" /> {name}
        </div>
        {isList 
        ? (
          <div className="list-rules">
            <SwitcherRedux
              model={`.${type}.${id}.include`}
              isrounded="yes"
            />
            <CheckboxBroadcastRedux
              model={`.${type}.${id}.anonymous`}
            />
          </div>
        ) 
        : (
          <div className="price-rules">
            <Control.text
              model={`.${type}.${id}.priceValue`}
              className="price-value"
              validators={{ isNumber }}
            />
            <div className="price-units">     
                <RadioBroadcastRedux model={`.${type}.${id}.priceUnit`} label="$" value="$"/>       
                <RadioBroadcastRedux model={`.${type}.${id}.priceUnit`} label="%" value="%"/>                      
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
    isList: PropTypes.bool,
  }
  