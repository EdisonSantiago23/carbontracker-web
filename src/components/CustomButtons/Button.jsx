import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import styles from "../../assets/jss/material-dashboard-react/components/buttonStyle.jsx";

export default function RegularButton(props) {
  const {
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;

  // Mapear clases de buttonStyle.jsx directamente a sx
  const sxStyles = {
    ...styles.button,
    ...(size ? styles[size] : {}),
    ...(color ? styles[color] : {}),
    ...(round ? styles.round : {}),
    ...(disabled ? styles.disabled : {}),
    ...(simple ? styles.simple : {}),
    ...(block ? styles.block : {}),
    ...(link ? styles.link : {}),
    ...(justIcon ? styles.justIcon : {})
  };

  const btnClasses = classNames(className);

  return (
    <Button {...rest} className={btnClasses} sx={sxStyles}>
      {children}
    </Button>
  );
}

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
};
