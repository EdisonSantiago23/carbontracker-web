import React from "react";
import useStyles from "./useStyles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import useSettings from "../../../../contextapi/hooks/useSettings";
import NoInfo from "../../../../components/Common/NoInfo";
import numeral from "numeral";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Tooltip, IconButton, CircularProgress } from "@material-ui/core";
import Button from "../../../../components/CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as FirestoreService from "./services/firestore";
import Box from "@material-ui/core/Box";
import SearchBar from "material-ui-search-bar";
import LoadingData from "src/components/Common/LoadingData";
import { nullFormat } from "numeral";
import New from "./New/New";
import { Link } from "react-router-dom";
import RateReview from "@material-ui/icons/KingBed";
import DeleteIcon from "@material-ui/icons/Delete";
import useAuth from "../../../../contextapi/hooks/useAuth";
import TabPanel from "./TabPanel";

const Index = () => {
  const {
    isAuthenticated,
    user
  } = useAuth();
  console.log('user', user);
  const classes = useStyles();
  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [threadKey, setthreadKey] = React.useState(user.hospitalId);
  const [open, setOpen] = React.useState(false);
  const [elm, setElm] = React.useState(null);
  const columns = [{
    id: "name",
    label: "Nombre"
  }, {
    id: "numero",
    label: "Número"
  }, {
    id: "nombreencargado",
    label: "NombreEncargado"
  }, {
    id: "cedulaencargado",
    label: "CedulaEncargado"
  }, {
    id: "fecha",
    label: "Fecha de creación"
  }, {
    id: "acciones",
    label: "Acciones"
  }];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [searched, setSearched] = React.useState("");
  const [filterUsuario, setfilterUsuario] = React.useState([]);

  const requestSearch = searchedVal => {
    const valor = 1;
    const filteredRows = usuario.filter(row => {
      return row.data().Nombre.toLowerCase().includes(searchedVal.toLowerCase()) || row.data().Direccion.toLowerCase().includes(searchedVal.toLowerCase()) || row.data();
    });
    setfilterUsuario(filteredRows);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteUserby(event) {
    setOpen(true);
    setElm(event);
  }

  const confir = () => {
    setOpen(false);

    if (elm) {
      FirestoreService.deleteBomba(elm, threadKey).then(docRef => {
        setOpen(false);
      });
    }
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const borrarSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return loading ? <LoadingData onLoad={() => borrarSearch()} /> : <Paper className={classes.root}>
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
      <Box mt={2}>
        {
        /* <New idHospital={threadKey} /> */
      }
      </Box>
      {usuario ? <Box mt={2}>
          <TabPanel />
        </Box> : <center>
          <NoInfo />
        </center>}


    </Paper>;
};

export default Index;