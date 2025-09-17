import React from "react";
import Paper from "@mui/material/Paper";
import useAuth from "../../../contextapi/hooks/useAuth";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {StyledTableRow,StyledTableCell} from "@styles";

import { EquiposService, EquipoHistorialService } from "@services";
import moment from "moment";
import { TimerOff } from '@material-ui/icons';
import { MedicamentoTabla } from "@config"

function Index(props) {
  const { user, IdArea } = useAuth();

  const IdHospital = user?.IdHospital;
  const [page, setPage] = React.useState(0);
  const columns = [
    { id: "time", label: "Hab." },
    { id: "time", label: "Tiempo" },
    { id: "fecha", label: "Fecha" },
    { id: "fecha", label: "Hora" }
  ];
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [historialEquipos, setHistorialEquipos] = React.useState([]);


  const [validator, SetValidator] = React.useState(1);
  React.useEffect(() => {
    getHistorial();
  }, [getHistorial,IdArea]);
  const getHistorial = React.useCallback(() => {
    try {
      EquipoHistorialService.getHistorialById(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setHistorialEquipos(Items);

          },
        },
        IdHospital,
        IdArea
      );
    } catch (error) {
    }
  }, [IdHospital,IdArea]);


  React.useEffect(() => {
    const interval = setInterval(() => {
      if (validator === 0) {
        SetValidator(1);
      }
      if (validator === 1) {
        SetValidator(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [validator]);

  function secondsToString(f1, f2) {
    const date1 = moment(f1).format("YYYY-MM-DD HH:mm:ss");
    const date2 = moment(f2).format("YYYY-MM-DD HH:mm:ss");
    var diff = moment(date2).unix() - moment(date1).unix();
    var formatoTiempo = moment.utc(moment.duration(diff,"s").asMilliseconds()).format("HH:mm:ss");
    return formatoTiempo;
  }
  
  return (
    <Box mt={2}>
      <Table
      >
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell align="center" key={index} style={{ fontSize: 35 }}  width={10}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {historialEquipos
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <StyledTableRow
                  hover
                  tabIndex={-1}
                  key={index}
                  style={
                    index === 0
                      ? row.data().Valor === 1 && validator === 0
                        ? { backgroundColor: "#FFE873" }
                        : { backgroundColor: "#ffffff" }
                      : { backgroundColor: "#ffffff" }
                  }>

                  <StyledTableCell align="center" style={{ fontSize: 35,width:"10%" }}>
                    {row.data().Habitacion?JSON.parse(row.data().Habitacion).Nombre:""}
                  </StyledTableCell>
             
                  <StyledTableCell align="center" style={{ fontSize: 35,width:"10%"}}>
                    {row.data().Valor === 1 ? <TimerOff /> : secondsToString(moment(row.data().FechaOn?.seconds * 1000).format("YYYY-MM-DD HH:mm:ss"), moment(row.data().FechaOff?.seconds * 1000).format("YYYY-MM-DD HH:mm:ss"))}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: 35 ,width:"50%"}}>
                    {moment(row.data().FechaOn?.seconds * 1000).format("YYYY-MM-DD")}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: 35,width:"10%" }}>
                    {moment(row.data().FechaOn?.seconds * 1000).format("HH:mm:ss")}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </Box>
  );
}

export default Index;
