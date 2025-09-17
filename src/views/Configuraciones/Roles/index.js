import React from "react";
import { Paper, Box, DialogTitle, DialogContentText, DialogContent, DialogActions, Tooltip, IconButton, TableRow, TablePagination, Table, Grid, TableBody, TableCell, TableContainer, TableHead } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import Button from "../../../components/CustomButtons/Button";
import { RolService } from '@services'
import DeleteIcon from "@material-ui/icons/Delete";
import New from "./New/New";
import {  StyledTableRow, StyledTableCell } from "../../../styles";
import { Container } from "../../../components";
import { RolesTabla } from "@config"


const Index = () => {
  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [elm, setElm] = React.useState(null);
  const [opensDs, seopensDs] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getRoles = React.useCallback(() => {
    RolService.getRoles(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setUsuarios(Items);
        },
      },
    );
    setLoading(false);
  }, []);
  React.useEffect(() => {
    setLoading(true)
    getRoles();
  }, [getRoles]);
  const handleClose = () => {
    setOpen(false);
    seopensDs(false);

  };
  function deleteUserby(event) {
    setOpen(true);
    setElm(event);
  }
  const confir = () => {
    setOpen(false);

    if (elm) {
      MedicamentoService.deleteMedicamento(elm).then((docRef) => {
        setOpen(false);
      });
    }
  };

  return (
    <Container loading={loading}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Eliminar
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estás seguro que quieres eliminar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="warning">
            Cancelar
          </Button>
          <Button onClick={confir} color="danger">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={12} sm={4}>
        <New />
      </Grid>

        <Box mt={2}>
          <TableContainer component={Paper}>
            <Table
              size="small"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {RolesTabla().map((column, index) => (
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
                          {row.data().Nombre}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.data().Tag}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Grid
                            container
                            spacing={0}
                            alignItems="center"
                            justifyContent="center"
                          >

                            <Grid>
                              <New aria-label="editar" data={row} />
                            </Grid>
                            <Grid>
                              <Tooltip title="Eliminar">
                                <IconButton
                                  aria-label="eliminar"
                                  onClick={() => deleteUserby(row.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>

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
