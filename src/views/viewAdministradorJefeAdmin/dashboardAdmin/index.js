import React from "react";
import PropTypes from "prop-types";
import { Container, withStyles } from "@material-ui/core";
import * as FirestoreService from "./services/firestore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Page from "../../../components/Common/Page";
import useSettings from "../../../contextapi/hooks/useSettings";
import useStyles from "./useStyles";
import Paper from "@material-ui/core/Paper";
import numeral from "numeral";
import { Bar, Line } from "react-chartjs-2";

const Dashboard = () => {
  const [page, setPage] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = useStyles();
  const [pagosPendientes, setPagosPendientes] = React.useState([]);
  const {
    settings
  } = useSettings();
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [{
      label: "Tiempos",
      data: [63.2, 59.56, 80.12, 81.23, 56.13, 55.32, 40.47, 40.79, 40.36, 40.75, 40.12, 40.56],
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 0"
    }]
  };
  const labels = ["January", "February", "March", "April", "May", "June", "July"];
  const datas = {
    labels,
    datasets: [{
      label: "Tiepo",
      data: [65, 59, 80, 81, 56, 55, 40, 40, 40, 40, 40, 40],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }, {
      label: "Enfermero",
      data: [40, 50, 40, 42, 40, 65, 59, 80, 81, 56, 55, 40],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)"
    }]
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    try {
      FirestoreService.getUsuariosMorosos(settings.idConjunto).then(querySnapshot => {
        let Items = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
        const usuariosName = [];
        let ItemsMorosos = [];
        Items.map(item => {
          const found = usuariosName.find(element => element == item.UsuarioId);

          if (item.UsuarioId != found) {
            usuariosName.push(item.UsuarioId);
            ItemsMorosos.push(item);
          } else {
            for (var i = 0; i < ItemsMorosos.length; i++) {
              if (ItemsMorosos[i].UsuarioId == found) {
                ItemsMorosos[i].Valor = ItemsMorosos[i].Valor + item.Valor;
              }
            }
          }
        });
        setPagosPendientes(ItemsMorosos);
      });
    } catch (e) {}
  }, [settings.idConjunto]);
  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "#051e34",
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  const StyledTableCell2 = withStyles(theme => ({
    head: {
      backgroundColor: "rgba(75, 192, 192, 1)",
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);
  return <Page className={classes.root} title="IOT">
      <Container maxWidth="lg">
        <center>
          <h1>BIENVENIDO</h1>
        </center>
        <div className={classes.root}>
          <div className={classes.sobreDos}>
            <Bar data={data} width={100} height={50} options={{
            plugins: {
              title: {
                display: true,
                text: "Tiempos registrados"
              }
            },
            responsive: true,
            interaction: {
              mode: "index",
              intersect: false
            },
            scales: {
              x: {
                stacked: true
              },
              y: {
                stacked: true
              }
            }
          }} />
          </div>
          <div className={classes.sobreDos}>
            <Line options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top"
              },
              title: {
                display: true,
                text: "Chart.js Line Chart"
              }
            }
          }} data={datas} />
          </div>
          <div className={classes.sobreDos}></div>
          <div className={classes.cien}>
            <p className={classes.titulo}></p>
          </div>
        </div>
      </Container>
    </Page>;
};

Dashboard.propTypes = {
  children: PropTypes.node
};
export default Dashboard;