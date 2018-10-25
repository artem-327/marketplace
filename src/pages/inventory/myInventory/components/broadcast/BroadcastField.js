import React from "react";
import PropTypes from "prop-types";
import { Control } from "react-redux-form";
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux";
import Switcher from "../../../../../components/Switcher/Switcher";
import { isNumber } from "../../../../../utils/validation";
import RadioRedux from "../../../../../components/Radio/RadioRedux";

const BroadcastField = ({ name, type, dispatch, isList }) => {
    return (
      <div className={`broadcast-field ${type}`}>
        <div className="field-name">
          <i className="fas fa-angle-right" /> {name}
        </div>
        {isList ? (
          <div className="list-rules">
            <Switcher
              onChange={value => console.log(value)}
              value={false} //TODO
              isRounded={true}
            />
            <CheckboxRedux
              defaultValue={false}
              dispatch={dispatch}
              model={"forms.broadcast.broadcastField"}
              onChange={value => console.log(value)}
            />
          </div>
        ) : (
          <div className="price-rules">
            <Control.text
              model={`forms.broadcast.${name}.priceRule`}
              className="price-rule"
              validators={{ isNumber }}
              id=".mark"
              defaultValue=""
            />

            <div className="price-units">                            
                <RadioRedux dispatch={dispatch} model={`forms.broadcast.${name}.priceunit`} opns={[{label:'%', value:`${name}%`}, {label:'$', value:`${name}$`}]} />
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
  