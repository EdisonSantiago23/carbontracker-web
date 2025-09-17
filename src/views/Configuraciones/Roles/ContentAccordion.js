import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material';
import { FuncionalidadesSistemaService, FuncionalidadService } from "@services";

import {
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { useStyles } from "../../../styles";

import { Checkbox, FormGroup } from '@mui/material';

export default function Index(props) {
  const { idFuncion, funcionalidadSistema, onChangeValue, onChangeItem } = props;
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    getFuncionalidad(funcionalidadSistema);
  }, [getFuncionalidad, funcionalidadSistema]);

  const getFuncionalidad = React.useCallback((dataTratar) => {
    try {
      FuncionalidadesSistemaService.getFuncionalidadesSistema(
        {
          next: (querySnapshot) => {
            const auxSn = [];
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            Items.forEach(element => {
              const result = dataTratar.find((x) => x.nombre == element.data().Tag);
              let auxDat = {
                "nombre": element.data().Nombre,
                "tag": element.data().Tag,
                "valor": result ? result.valor : false

              }
              onChangeItem(auxDat)
              auxSn.push(auxDat)
            });
            setData(auxSn);
          },
        },
        idFuncion
      );
    } catch (e) {  }
  }, [idFuncion, onChangeItem]);


  const handleChanges = (event) => {
    setData([])
    var valorAcambiar = data.find(item => item.tag == event.target.name);

    let listCopy = [...data];
    let filteredDataSource = listCopy.map(p =>
      p.tag == event.target.name
        ? { ...p, valor: !valorAcambiar.valor }
        : p
    );
    setLoading(true)
    onChangeValue(event)
    setTimeout(() => {
      setData(filteredDataSource)
      setLoading(false)

    }, 1000);
    enqueueSnackbar("Rol creado correctamente", {
      variant: "success",
    });
  };

  return (
    <Fragment>
      {!loading ? <FormControl component="fieldset">
        <FormGroup>
          {data.map((row, index) => {
            return <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChanges}
                  name={row.tag}
                  checked={row.valor}
                  key={index}
                />
              }
              label={row.nombre }
            />
          })}


        </FormGroup>
      </FormControl> : <Box display="flex" justifyContent="center" my={5}>
        <CircularProgress />
      </Box>}
    </Fragment>

  );
};

Index.propTypes = {
  className: PropTypes.string,
  onChangeValue: PropTypes.func,
  onChangeItem: PropTypes.func,

};
Index.defaultProps = {
  className: '',
  onChangeValue: () => {
  },
  onChangeItem: () => {
  },
};