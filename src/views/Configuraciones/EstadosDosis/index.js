import React from "react";
import { Box, TableRow,  Grid, TableCell, } from '@mui/material';
import { EstadosService } from '@services'
import { EstadosTabla } from "@config"
import { TablePage, ContentForm, Container, confirmDialog, Iconify } from "@components";
import { useSnackbar } from "notistack";
import CreateForm from "./CreateForm";


const Index = () => {
  let nombre = 'Estado de dosis';
  const [openModal, setOpenModal] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState({ data: [], page: 0, rowsPerPage: 5 });
  const { enqueueSnackbar } = useSnackbar();

  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getEstados();
  }, [getEstados]);
  const getEstados = React.useCallback(() => {
    EstadosService.getEstados(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setUsuarios(Items);
          setLoading(false);

        },
      },
    );
  }, []);
  const obtenerFIltrado = (res) => {
    setTimeout(() => {
      setFilteredData(res)
    }, 100);
  }
  const eliminarRegistro = (Registro) => {
    confirmDialog('¿Estás seguro que deseas eliminar el enfermero ' + Registro.data().Nombre + "?", () =>
      eliminar(Registro.id)
    );
  };
  const eliminar = (IdRegistro) => {
    EstadosService.deleteEnfermero(IdRegistro).then(() => {
      enqueueSnackbar("Enfermero eliminado correctamente", { variant: "success" });
    });
  };
  return (<Container loading={loading} titulo={nombre} component={<ContentForm openModal={openModal} content={<CreateForm close={() => setOpenModal(false)} />} />}>
    <Box mt={2}>
      <TablePage
        titulo={nombre}
        Cabecera={EstadosTabla()}
        Lista={usuario}
        returnList={obtenerFIltrado}
        contenidoTabla={filteredData.data.slice(filteredData.page * filteredData.rowsPerPage, filteredData.page * filteredData.rowsPerPage + filteredData.rowsPerPage).map((row, index) => {
          const { Nombre, Tag } = row.data();
          return (
            <TableRow hover key={index.toString()} tabIndex={-1} >
              <TableCell align="left">{Nombre}</TableCell>
              <TableCell align="left">{Tag}</TableCell>
              <TableCell align="left">
                <Grid container>
                  <Grid>
                    <Iconify icon={'material-symbols:delete-outline'} tooltip={"Eliminar"} onClick={() => eliminarRegistro(row)} />
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          )
        })}
      />
    </Box>
  </Container>
  );
};
export default Index;
