import React from "react";
import CardContent from '@mui/material/CardContent';
import { sentenceCase } from 'change-case';
import PropTypes from "prop-types";
import useAuth from "../../contextapi/hooks/useAuth";

import { CardHeader, Card, Grid, TextField, InputAdornment, Typography } from '@mui/material';
import Iconify from '../../components/iconify';
import Label from "../../components/label/index";

import { TratamientoService } from '@services'
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import moment from "moment";
import {StyledTableRow,StyledTableCell} from "@styles";


export default function Index(props) {
  const { IdHistorial, IdPaciente } = props;
  const [historial, setHistorial] = React.useState([]);
  const columns = [
    { id: "name", label: "Fecha" },
    { id: "apellido", label: "Estado" },
    { id: "apellido", label: "Detalle" },
    { id: "apellido", label: "Encargado" },
    { id: "apellido", label: "Medicamento" },
    { id: "cedula", label: "Compatibilidad sugerida" },
  ];
  const { user } = useAuth();
  const IdHospital = user.IdHospital;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  React.useEffect(() => {
    obtenerTratamiento()
  }, [obtenerTratamiento]);
  const obtenerTratamiento = React.useCallback(() => {
    TratamientoService.getTratamiento(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setHistorial(Items)

        },
      },
      IdHospital,
      IdPaciente,
      IdHistorial
    );
  }, [IdHistorial, IdHospital, IdPaciente]);
  const validarTipo = (idTipo) => {
    switch (idTipo) {
      case 1:
        return "success";
      case 2:
        return "warning";
      case 3:
        return "error";
      case 4:
        return "info"
    }
  };
  const validarNombre = (idTipo) => {
    switch (idTipo) {
      case 1:
        return "Compatible";
      case 2:
        return "Com. variada";
      case 3:
        return "Incompatibles";
      case 4:
        return "Sin Datos"
    }
  };
  return (
    <Grid>

      <Card  >
 
        <CardContent>
          <Grid container spacing={3} style={{ marginTop: 10 }} >

            <Table
              size="small"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <StyledTableCell align="center" key={index}>
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {historial
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <StyledTableRow hover tabIndex={-1} key={index}>
                        <StyledTableCell align="center">
                          {moment(row.data().FechaAsignacion?.seconds * 1000).format("YYYY-MM-DD [-] HH:mm:ss")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.data()?.Estado && JSON.parse(row.data()?.Estado)?.Nombre}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.data().Detalle}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.data()?.EnfermeroTurno && <Typography color="textPrimary">
                            {JSON.parse(row.data()?.EnfermeroTurno)?.Nombre + " " + JSON.parse(row.data()?.EnfermeroTurno)?.Apellido}
                          </Typography>}

                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.data().Medicamentos && JSON.parse(row.data().Medicamentos).map((option) => (
                            <Typography color="textPrimary">
                              {"* "}{option.Nombre}
                            </Typography>
                          ))}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Label color={validarTipo(row.data().Tipo)}>{sentenceCase(validarNombre(row.data()?.Tipo))}</Label>
                        </StyledTableCell>

                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>

          </Grid>
        </CardContent>

      </Card>
    </Grid>
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