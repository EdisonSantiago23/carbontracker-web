import React from "react";
import { Paper, Box, TableRow, Grid, TablePagination, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { MenuService } from '@services'
import New from "./New/New";
import {  StyledTableRow, StyledTableCell } from "../../../styles";
import { Container } from "../../../components";
import { MenuTabla } from "@config"
import Iconify from '../../../components/iconify';

import {
  Typography, Stack
} from '@mui/material';
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
  const getMenu = React.useCallback(() => {
    try {
      MenuService.getMenu(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setData(Items);

          },
        },
        idFuncionalidad
      );
      setLoading(false);
    } catch (e) { }
  }, [idFuncionalidad]);
  React.useEffect(() => {
    setLoading(true)
    getMenu();
  }, [getMenu]);



  return (
    <Container loading={loading}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Menú
        </Typography>
        <New idFuncionalidad={idFuncionalidad} />

      </Stack>


      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table
            size="small"
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {MenuTabla().map((column, index) => (
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
                        {row.data().Orden}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Title}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.data().Path}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Iconify icon={row.data().Icon} sx={{ width: 25, height: 25 }} cli />

                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <New aria-label="editar" data={row} />
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
