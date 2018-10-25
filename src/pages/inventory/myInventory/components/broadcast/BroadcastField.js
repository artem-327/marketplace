import React from "react";
import PropTypes from "prop-types";
import { Control } from "react-redux-form";
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux";
import SwitcherRedux from "../../../../../components/Switcher/SwitcherRedux";
import { isNumber } from "../../../../../utils/validation";
import RadioRedux from "../../../../../components/Radio/RadioRedux";

const BroadcastField = ({ name, id, type, dispatch, isList }) => {
    return (
      <div className={`broadcast-field ${type}`}>
        <div className="field-name">
          <i className="fas fa-angle-right" /> {name}
        </div>
        {isList ? (
          <div className="list-rules">
            <SwitcherRedux
              defaultValue={false}
              dispatch={dispatch}
              model={`forms.broadcastRules.${type}.${id}.include`}
              onChange={value => console.log(value)}
              isRounded={true}
            />
            <CheckboxRedux
              defaultValue={false}
              dispatch={dispatch}
              model={`forms.broadcastRules.${type}.${id}.anonymous`}
              onChange={value => console.log(value)}
            />
          </div>
        ) : (
          <div className="price-rules">
            <Control.text
              model={`forms.broadcastRules.${type}.${id}.priceRule`}
              className="price-rule"
              validators={{ isNumber }}
              defaultValue=""
            />
            <div className="price-units">                            
                <RadioRedux dispatch={dispatch} model={`forms.broadcastRules.${type}.${id}.priceUnit`} opns={[{label:'%', value:`%`}, {label:'$', value:`$`}]} />
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
  