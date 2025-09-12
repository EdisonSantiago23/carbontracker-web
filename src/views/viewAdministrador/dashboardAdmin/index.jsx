import React from "react";
import PropTypes from "prop-types";
import { Container, withStyles } from "@mui/material";
import * as FirestoreService from "./services/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Page from "../../../components/Common/Page";
import useSettings from "../../../contextapi/hooks/useSettings";
import useStyles from "./useStyles";
import { Bar, Doughnut } from "react-chartjs-2";

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
      label: "Hospital",
      data: [65, 59, 80, 81, 56, 55, 40, 40, 40, 40, 40, 40],
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 0"
    }]
  };
  const data2 = {
    labels: ["Hospitales", "Areas", "Camas"],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
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
      FirestoreService.getHispitales({
        next: querySnapshot => {
          const Items = querySnapshot.docs.map(docSnapshot => docSnapshot);
          console.log("aaaaaaaaaaa", Items);
        }
      }, settings.idConjunto);
      setLoading(false);
    } catch (e) {}
  }, [settings.idConjunto]);

  const loadDataChart = () => {
    if (settings !== undefined) {
      return settings.idConjunto;
    } else {
      return undefined;
    }
  };

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
          <h1>BIENVENIDOS</h1>
        </center>
        <div className={classes.root}>
          <div className={classes.sobreDos}>
            <Bar data={data} width={100} height={50} options={{
            plugins: {
              title: {
                display: true,
                text: "Hospitales ingresados"
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
            <Doughnut data={data2} options={{
            legend: {
              display: false,
              position: "right"
            },
            elements: {
              arc: {
                borderWidth: 0
              }
            }
          }} />
            ;
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