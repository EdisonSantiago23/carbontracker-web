import React from "react";
import * as FirestoreService from "./services/firestore";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "../../../components/CustomButtons/Button";
import New from "../Usuarios/NewAndEdit/New";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Tooltip, IconButton, Grid } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440,
    width: "100%"
  }
});

function Usuarios(props) {
  const [usuario, setUsuarios] = React.useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [elm, setElm] = React.useState(null);
  const [informacion] = React.useState(props.info);
  const columns = [{
    id: "name",
    label: "Nombre"
  }, {
    id: "apellido",
    label: "Apellido"
  }, {
    id: "correo",
    label: "Correo electrónico"
  }, {
    id: "cedula",
    label: "Cédula"
  }, {
    id: "telefono",
    label: "Celular"
  }];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confir = () => {
    if (elm) {
      FirestoreService.deleteUsuario(settings.idConjunto, elm).then(docRef => {
        setLoading(false);
      });
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {}, []);

  function handleLike(event) {
    setOpen(true);
    setElm(event);
  }

  return <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{
        cursor: "move"
      }} id="draggable-dialog-title">
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

      <Paper className={classes.root}>
        <New />
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => <TableCell align="center" key={index}>
                    {column.label}
                  </TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {usuario.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return <TableRow hover tabIndex={-1} key={index}>
                      <TableCell align="center">{row.data().Nombre}</TableCell>
                      <TableCell align="center">{row.data().Apellido}</TableCell>
                      <TableCell align="center">{row.data().Correo}</TableCell>
                      <TableCell align="center">{row.data().Cedula}</TableCell>
                      <TableCell align="center">{row.data().Celular}</TableCell>
                      <TableCell align="center">
                        <Grid container spacing={3}>
                          <Grid item md={4} xs={4}>
                            <Tooltip title="Eliminar">
                              <IconButton aria-label="eliminar" onClick={() => handleLike(row.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <Tooltip title="Editar">
                              <IconButton aria-label="eliminar" onClick={() => handleLike(row.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>

                        </Grid>
                      </TableCell>



                    </TableRow>;
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={usuario.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
      </Paper>
    </div>;
}

export default Usuarios;