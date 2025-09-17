import React from "react";
import { Paper, Box, TableRow, Grid, TablePagination, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { FuncionalidadesSistemaService } from '@services'
import New from "./New/New";
import { Container } from "../../../components";
import { FuncionalidadesTabla } from "@config"
import {StyledTableRow,StyledTableCell} from "@styles";


const Index = (props) => {
  const idFuncionalidad = props.idFuncionalidad;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getFuncionalidad = React.useCallback(() => {
    try {
      FuncionalidadesSistemaService.getFuncionalidadesSistema(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setData(Items);
          },
        },
        idFuncionalidad
      );
      setLoading(false);
    } catch (e) {}
  }, [idFuncionalidad]);
  React.useEffect(() => {
    setLoading(true)
    getFuncionalidad();
  }, [getFuncionalidad]);



  return (
    <Container loading={loading}>
      <Grid item xs={12} sm={4}>
        <New idFuncionalidad={idFuncionalidad}/>
      </Grid>
        <Box mt={2}>
          <TableContainer component={Paper}>
            <Table
              size="small"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {FuncionalidadesTabla().map((column, index) => (
                    <StyledTableCell align="center" key={index}>
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};
export default Index;
