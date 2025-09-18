import React from "react";
import {
  Paper,
  Box,
  Tooltip,
  IconButton,
  TableRow,
  TablePagination,
  Table,
  Grid,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import { useParams } from "react-router-dom";
import Header from "./Header";
import {StyledTableRow,StyledTableCell} from "@styles";

import { UsuariosService } from "@services";
import New from "./New/New";
import { PersonalTabla } from "@config"
import { Container, confirmDialog, Label } from "@components";
import { sentenceCase } from 'change-case';
import { useSnackbar } from "notistack";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { threadKey } = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (threadKey) {
      getAllUsuariosByHospital();
    } else {
      getAllUsuarios();
    }
  }, [getAllUsuarios, getAllUsuariosByHospital, threadKey]);
  const getAllUsuarios = React.useCallback(() => {
    try {
      UsuariosService.getAllUsuarios({
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setUsuarios(Items);
          setLoading(false);
        },
      });
      setLoading(false);
    } catch (e) {
    }
  }, []);
  const getAllUsuariosByHospital = React.useCallback(() => {
    try {
      UsuariosService.getUsuarioByHispital(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setUsuarios(Items);
            setLoading(false);
          },
        }, threadKey);
      setLoading(false);
    } catch (e) {
    }
  }, [threadKey]);
  const desactivarRegistro = (Registro) => {
    let estado = !Registro.data().Estado ? "Activar" : "Desactivar";
    confirmDialog("¿Estás seguro que deseas " + estado + " el usuario " + Registro.data().Nombre + "?", () =>
      estadoRegistro(Registro, estado)
    );
  };
  const estadoRegistro = (Registro, estado) => {
    UsuariosService.estadoRegistro(Registro).then(() => {
      enqueueSnackbar("Usuario " + estado + " correctamente", { variant: "success" });
    });
  };
  const eliminaRegistro = (Registro) => {
    confirmDialog('¿Estás seguro que deseas eliminar el usuario ' + Registro.data().Nombre + "?", () =>
      eliminarRegistro(Registro)
    );
  };
  const eliminarRegistro = (Registro) => {
    UsuariosService.eliminarRegistro(Registro).then(() => {
      enqueueSnackbar("Usuario eliminado correctamente", { variant: "success" });
    });
  };
  return (
    <Container loading={loading}>
      <Box mt={2}>
        <Header />
      </Box>

      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table
            size="small"
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {PersonalTabla().map((column, index) => (
                  <StyledTableCell align="center" key={index}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {usuario
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow hover tabIndex={-1} key={index}>
                      <StyledTableCell align="center">
                        <Label color={row.data().Estado ? "success" : "error"}>{sentenceCase(row.data().Estado ? "Activo" : "Inactivo")}</Label>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Nombre}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Apellido}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Cedula}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Correo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Rol.Nombre}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Grid
                          container
                          spacing={0}
                          alignItems="center"
                          justifyContent="center"
                        >
                          {row.data().Estado && <Grid>
                            <New aria-label="editar" data={row} />
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
        count={usuario.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};
export default Index;
