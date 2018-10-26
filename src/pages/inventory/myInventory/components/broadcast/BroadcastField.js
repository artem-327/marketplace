import React from "react";
import PropTypes from "prop-types";
import { Control } from "react-redux-form";
import CheckboxBroadcastRedux from "../../../../../components/Checkbox/CheckboxBroadcastRedux";
import RadioRedux from "../../../../../components/Radio/RadioRedux";
import SwitcherRedux from "../../../../../components/Switcher/SwitcherRedux";
import { isNumber } from "../../../../../utils/validation";


const BroadcastField = ({ name, id, type, dispatch, isList }) => {
    return (
      <div className={`broadcast-field ${type}`}>
        <div className="field-name">
          <i className="fas fa-angle-right" /> {name}
        </div>
        {isList ? (
          <div className="list-rules">
            <SwitcherRedux
              model={`.broadcastRules.${type}.${id}.include`}
              isRounded={true}
            />
            <CheckboxBroadcastRedux
              defaultValue={false}
              dispatch={dispatch}
              model={`.broadcastRules.${type}.${id}.anonymous`}
              onChange={value => console.log(value)}
            />
          </div>
        ) : (
          <div className="price-rules">
            <Control.text
              model={`.broadcastRules.${type}.${id}.priceRule`}
              className="price-rule"
              validators={{ isNumber }}
            />
            <div className="price-units">                            
                <RadioRedux dispatch={dispatch} model={`.broadcastRules.${type}.${id}.priceUnit`} opns={[{label:'%', value:`%`}, {label:'$', value:`$`}]} />
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
  