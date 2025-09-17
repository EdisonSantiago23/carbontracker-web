import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Autocomplete, TextField } from '@mui/material';
import PropTypes from "prop-types";

export default function Index(props) {
  const { labelText, value, opciones, cargando, onChangeValue, variant, ...res } = props;
  const [values, setValues] = useState(null);

  const setFieldValue = (value) => {
    setValues(value);
    onChangeValue(value)
  };
  useEffect(() => {
    if (opciones.length > 0) {
      const valorInfo = opciones.find(
        (x) => x.id === value
      );
      let dts = {
        id: valorInfo ? valorInfo.id : null,
        label: valorInfo ? valorInfo.data().Nombre : "",
      }
      setValues(dts);

    }


  }, [opciones, value])


  const defaultOptions = {
    options: opciones.length > 0 ? opciones.map((option) => ({
      id: option.id,
      label: option.data().Nombre,
    })) : [],
    getOptionLabel: (options) => options.label,

  }
  return (
    <Formik err>
      {({ errors, touched }) => (
        <Form>
          <Autocomplete
            {...res}
            {...defaultOptions}
            id="controlled"
            onChange={(e, value) => setFieldValue(value)}
            value={values}

            isOptionEqualToValue={(option, value) =>
              value === undefined || value === "" || option.id === value.id
            }

            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={labelText} />
            )}
          />
        </Form>
      )}
    </Formik>
  );
}
Index.propTypes = {
  labelText: PropTypes.string,
  opciones: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  variant: PropTypes.oneOf(['filled', 'standard']),
  onChangeValue: PropTypes.func,
  cargando: PropTypes.bool,
};
Index.defaultProps = {
  opciones: [],
  valor: null,
  cargando: true,
  variant: 'filled',
  labelText: '',
  onChangeValue: () => {

  },
};