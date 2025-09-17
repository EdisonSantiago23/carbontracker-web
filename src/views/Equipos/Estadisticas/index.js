import React from "react";
import { Container } from "../../../components";
import { useParams } from "react-router-dom";
import { historialEquiposService } from "@services";
import useAuth from "../../../contextapi/hooks/useAuth";
import Grid from "@mui/material/Grid";
import {
  AppWebsiteVisits,

} from '../../../components/ChartsDashboard';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { StyledTableRow, StyledTableCell, useStyles } from "../../../styles";
import moment from "moment";
import { TimerOff } from '@material-ui/icons';
import Filtro from './Filtro';
import { EstadisticasTabla } from "@config"

const Index = () => {
  const [loading, setLoading] = React.useState([]);
  const [equipos, setEquipos] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const { user } = useAuth();
  const IdHospital = user.IdHospital;
  const { idEquipo } = useParams();

  React.useEffect(() => {
    setLoading(false)
  }, []);

  function secondsToString(f1, f2) {
    const date1 = moment(f1).format("YYYY-MM-DD HH:mm:ss");
    const date2 = moment(f2).format("YYYY-MM-DD HH:mm:ss");
    var diff = moment(date2).unix() - moment(date1).unix();
    var formatoTiempo = moment.utc(moment.duration(diff, "s").asMilliseconds()).format("HH:mm:ss");
    return formatoTiempo;
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getEquiposByHospitalFilter = React.useCallback((filter) => {
      historialEquiposService.getHistorialByEquipo(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setEquipos(Items);

          },
        },
        IdHospital,
        idEquipo,
        filter
      );
      setLoading(false);
  }, [IdHospital, idEquipo]);
  return (
    <Container loading={loading}>
      <Grid item xs={12} md={6} lg={8}>

        <Filtro send={(res)=>getEquiposByHospitalFilter(res)}/>
      </Grid>
      {/* <Grid item xs={12} md={6} lg={8}>
        <AppWebsiteVisits
          title="Website Visits"
          subheader="(+43%) than last year"
          chartLabels={[
            '01/01/2003',
            '02/01/2003',
            '03/01/2003',
            '04/01/2003',
            '05/01/2003',
            '06/01/2003',
            '07/01/2003',
            '08/01/2003',
            '09/01/2003',
            '10/01/2003',
            '11/01/2003',
          ]}
          chartData={[
            {
              name: 'Team A',
              type: 'column',
              fill: 'solid',
              data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },
            {
              name: 'Team B',
              type: 'area',
              fill: 'gradient',
              data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
            },
            {
              name: 'Team C',
              type: 'line',
              fill: 'solid',
              data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            },
          ]}
        />
      </Grid> */}
      <TableContainer >
        <Table
          size="small"
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {EstadisticasTabla().map((column, index) => (
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
                      {row.data().Serial}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.data().Habitacion ? JSON.parse(row.data().Habitacion).Nombre : ""}
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      {moment(row.data().FechaOn?.seconds * 1000).format("YYYY-MM-DD")}
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      {moment(row.data().FechaOn?.seconds * 1000).format("HH:mm:ss")}
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      {moment(row.data().FechaOff?.seconds * 1000).format("YYYY-MM-DD")}
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      {moment(row.data().FechaOff?.seconds * 1000).format("HH:mm:ss")}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {secondsToString(moment(row.data().FechaOn?.seconds * 1000).format("YYYY-MM-DD HH:mm:ss"), moment(row.data().FechaOff?.seconds * 1000).format("YYYY-MM-DD HH:mm:ss"))}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
}

export default Index;
