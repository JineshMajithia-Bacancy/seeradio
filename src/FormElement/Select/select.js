import React from "react";
import Select from "react-select";
import { Label } from "reactstrap";

const SelectField = (props) => {
  const handleChange = (event, name) => {
    props.onChange(event, name);
  };

  return (
    <div>
      <Label for={props.for} className="fw-bold text-black ">
        {props.label}
        <span style={{ color: "red", fontSize: "17px" }}>
          <sup>*</sup>
        </span>
      </Label>
      <Select
        id={props.id}
        value={props.value}
        onChange={(event) => handleChange(event, props.name)}
        className="basic-single"
        classNamePrefix="select"
        name={props.name}
        options={props.options}
        isDisabled={props.disabled}
      />
    </div>
  );
};

export default SelectField;
