import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { EquiposService } from "@services";
import Box from "@mui/material/Box";
import Reporte from "./Reporte/Reporte";
import { useParams } from "react-router-dom";
import {  StyledTableRow, StyledTableCell } from "../../styles";
import Header from "./Header";
import useAuth from "../../contextapi/hooks/useAuth";
import New from "./New/New";
import {Grid} from '@mui/material';
import { sentenceCase } from 'change-case';

import { Tooltip, IconButton, } from '@mui/material';
import { Link } from "react-router-dom";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { EquiposTabla } from "@config"
import { Container, confirmDialog, Label } from "@components";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSnackbar } from "notistack";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { IdHospitalEquipo } = useParams();
  const { user } = useAuth();
  const rol = user?.Rol;
  const IdHospital = IdHospitalEquipo ? IdHospitalEquipo : user.IdHospital;
  const [equipos, setEquipos] = React.useState([]);
  const [loading, setLoading] = React.useState(true)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  React.useEffect(() => {
    getEquiposByHospital();
  }, [getEquiposByHospital]);

  const getEquiposByHospital = React.useCallback(() => {
      EquiposService.getAllEquiposById(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setEquipos(Items);
          },},IdHospital);
      setLoading(false);
  }, [IdHospital]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


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
        return "Libre";
      case 2:
        return "Ocupada";
      case 3:
        return "Reportada";

    }
  };
  const desactivarRegistro = (Registro) => {
    let estado = !Registro.data().Estado ? "Activar" : "Desactivar";
    confirmDialog("¿Estás seguro que deseas " + estado + " el equipo " + Registro.data().Modelo + "?", () =>
      estadoRegistro(Registro, estado)
    );
  };
  const estadoRegistro = (Registro, estado) => {
    EquiposService.estadoRegistro(IdHospital, Registro).then(() => {
      enqueueSnackbar("Equipo " + estado + " correctamente", { variant: "success" });
    });
  };
  const eliminaRegistro = (Registro) => {
    confirmDialog('¿Estás seguro que deseas eliminar el equipo ' + Registro.data().Modelo + "?", () =>
      eliminarRegistro(Registro)
    );
  };
  const eliminarRegistro = (Registro) => {
    EquiposService.eliminarRegistro(IdHospital, Registro).then(() => {
      enqueueSnackbar("Equipo eliminado correctamente", { variant: "success" });
    });
  };
  return (
    <Container loading={loading} titulo={"Equipos"}>
      <Header IdHospital={IdHospital} />

      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table
            size="small"
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {EquiposTabla().map((column, index) => (
                  <StyledTableCell align="center" key={index}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {equipos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow hover tabIndex={-1} key={index}>
                      <StyledTableCell align="center">
                        <Label color={row.data().Estado ? "success" : "error"}>{sentenceCase(row.data().Estado ? "Activo" : "Inactivo")}</Label>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center">
                        <Label color={validarTipo(row.data().EstadoEquipo)}>{sentenceCase(validarNombre(row.data()?.EstadoEquipo))}</Label>

                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Serial}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.data().Modelo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Codigo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Alambrico ? "SI" : "NO"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Grid
                          container
                          spacing={0}
                          alignItems="center"
                          justifyContent="center">
                          {rol.reportarEquipos && <Reporte data={row} />}
                          {rol.editarEquipo && row.data().Estado && <New aria-label="editar" data={row} IdHospital={IdHospital} />}
                          {row.data().Estado && <Grid>
                            <Tooltip title="Estadísticas">
                              <Link
                                to={
                                  "/administrador/estadistica/" + row.id}>
                                <IconButton aria-label="Jefes">
                                  <AnalyticsIcon />
                                </IconButton>
                              </Link>
                            </Tooltip>
                          </Grid>}
                          <Grid>
                            <Tooltip title={!row.data().Estado ? "Activar" : "Desactivar"}>
                              <IconButton
                                aria-label={!row.data().Estado ? "Activar" : "Desactivar"}
                                onClick={() => desactivarRegistro(row)}>
                                {row.data().Estado ? <RestoreFromTrashIcon /> : <CheckCircleOutlineIcon />}
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          {row.data().Estado && <Grid>
                            <Tooltip title="Eliminar">
                              <IconButton
                                aria-label="eliminar"
                                onClick={() => eliminaRegistro(row)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>}
                        </Grid>

                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


      <TablePagination
        labelRowsPerPage={"Filas por página"}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={equipos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};
export default Index;
