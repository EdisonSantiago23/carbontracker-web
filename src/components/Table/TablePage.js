import PropTypes from 'prop-types';
import { filter } from 'lodash';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid
} from '@mui/material';

// components
import Scrollbar from '../scrollbar';
// sections
import { ListHead, ListToolbar } from '../Table';

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}



export default function TablePage(props) {
  const { Cabecera, Lista ,returnList, contenidoTabla,titulo ,parametroFiltro} = props;

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('Nombre');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Lista.length) : 0;
  const filteredUsers = applySortFilter(Lista, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      const filtrado = filter(array, (_user) => _user.data()[parametroFiltro].toLowerCase().indexOf(query.toLowerCase()) !== -1);
      const resultado = {
        data: filtrado,
        page: page,
        rowsPerPage: rowsPerPage
      }
      returnList(resultado)
      return filtrado
    }
    const info = stabilizedThis.map((el) => el[0]);
    const resultado = {
      data: info,
      page: page,
      rowsPerPage: rowsPerPage
    }
    returnList(resultado)
    return info;
  }


  return (

    <Container>

      <Card>
        <ListToolbar titulo={"Buscando por "+parametroFiltro+"..."} filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer  >
            <Table size="small">
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={Cabecera}
                rowCount={Lista.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {contenidoTabla}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No se encontraron resultados para &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Intente verificar errores tipográficos o usar palabras completas.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Lista.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>


  );
}
TablePage.propTypes = {
  returnList: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  parametroFiltro: PropTypes.string,



};

TablePage.defaultProps = {
  parametroFiltro: "Nombre",


}