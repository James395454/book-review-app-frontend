import React from "react";
import PropTypes from "prop-types";
import { useField, FieldAttributes } from "formik";
import { MDBInput } from "mdbreact";
import "./fieldComponent.css";

function CustomTextField({
  placeholder,
  label,
  containerClass,
  ...props
}: any) {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const hasError = !!errorText || props.error;
  const finalErrorText = errorText || props.helperText;

  return (
    <div style={hasError ? { color: "red" } : {}}>
      <MDBInput
        placeholder={placeholder || ""}
        label={label}
        className={hasError ? "error-border" : ""}
        containerClass={`text-left ${containerClass ? containerClass : ""}`}
        {...field}
        {...props}
      />
      {hasError && <div className="error-text">{finalErrorText}</div>}
    </div>
  );
}

CustomTextField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default CustomTextField;
