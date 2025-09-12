import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Clear from "@mui/icons-material/Clear";
import Check from "@mui/icons-material/Check";
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle.jsx";

export default function CustomInput(props) {
  const {
    formControlProps,
    labelText,
    id,
    name,
    labelProps,
    inputProps,
    error,
    success,
    rtlActive
  } = props;

  const labelClasses = classNames({
    [" " + styles.labelRootError]: error,
    [" " + styles.labelRootSuccess]: success && !error,
    [" " + styles.labelRTL]: rtlActive
  });

  const underlineClasses = classNames({
    [styles.underlineError]: error,
    [styles.underlineSuccess]: success && !error,
    [styles.underline]: true
  });

  const marginTop = classNames({
    [styles.marginTop]: labelText === undefined
  });

  const newInputProps = {
    maxLength: inputProps?.maxLength,
    minLength: inputProps?.minLength,
    step: inputProps?.step
  };

  return (
    <FormControl
      {...formControlProps}
      sx={{ ...styles.formControl }}
      className={formControlProps?.className}
    >
      {labelText && (
        <InputLabel
          htmlFor={id}
          {...labelProps}
          sx={{ ...styles.labelRoot }}
          className={labelClasses}
        >
          {labelText}
        </InputLabel>
      )}
      <Input
        id={id}
        name={name}
        {...inputProps}
        inputProps={newInputProps}
        sx={{
          ...styles.underline,
          ...(error && styles.underlineError),
          ...(success && !error && styles.underlineSuccess),
          ...(labelText === undefined && styles.marginTop),
          ...styles.disabled
        }}
      />
      {error ? (
        <Clear sx={{ ...styles.feedback, ...styles.labelRootError }} />
      ) : success ? (
        <Check sx={{ ...styles.feedback, ...styles.labelRootSuccess }} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  rtlActive: PropTypes.bool
};
