import React from "react";
import { FormFeedback, Input, Label } from "reactstrap";
import "./floatinginput.css";

const FloatingInput = (props) => {
  return (
    <div className="mb-3">
      <Label for={props.for} className="fw-bold text-black ">
        {props.label}
        {props.required ? null : (
          <span style={{ color: "red", fontSize: "17px" }}>
            <sup>*</sup>
          </span>
        )}
      </Label>
      <Input
        type={props.type}
        className={props.classes}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        autoComplete={props.autoComplete}
        maxLength={props.maxLength}
        disabled={props.disabled}
        invalid={props.error}
      />
      <FormFeedback valid={!props.error}>{props.errrMessage}</FormFeedback>
    </div>
  );
};

export default FloatingInput;
