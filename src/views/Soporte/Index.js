import React from "react";
import { SoporteService } from "@services";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { SoporteTabla } from "@config"
import CreateForm from "./CreateForm";
import { TablePage, ContentForm, Container, confirmDialog, Iconify } from "@components";
import TableCell from "@mui/material/TableCell";


const Index = () => {
  let nombre = 'Soporte';
  const [filteredData, setFilteredData] = React.useState({ data: [], page: 0, rowsPerPage: 5 });
  const [openModal, setOpenModal] = React.useState(false);
  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {
    getSoportes();
  }, [getSoportes]);

  const getSoportes = React.useCallback(() => {
    try {
      SoporteService.getSoportes(
        {
          next: (querySnapshot) => {
            const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
            setUsuarios(Items);
          },
        }
      );
      setLoading(false);
    } catch (e) { }
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
    EnfermerosService.deleteEnfermero(IdRegistro).then(() => {
      enqueueSnackbar("Enfermero eliminado correctamente", { variant: "success" });
    });
  };
  return <Container loading={loading} titulo={nombre} component={<ContentForm openModal={openModal} content={<CreateForm close={() => setOpenModal(false)} />} />}>
    <Box mt={2}>
      <TablePage
        titulo={nombre}
        Cabecera={SoporteTabla()}
        Lista={usuario}
        returnList={obtenerFIltrado}
        contenidoTabla={filteredData.data.slice(filteredData.page * filteredData.rowsPerPage, filteredData.page * filteredData.rowsPerPage + filteredData.rowsPerPage).map((row, index) => {
          const { Nombre, Correo, Direccion, Telefono, Detalle } = row.data();
          return (
            <TableRow hover key={index.toString()} tabIndex={-1} >
              <TableCell align="left">{Nombre}</TableCell>
              <TableCell align="left">{Correo}</TableCell>
              <TableCell align="left">{Direccion}</TableCell>
              <TableCell align="left">{Telefono}</TableCell>
              <TableCell align="left">{Detalle}</TableCell>
              <TableCell align="left">
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid>
                    <ContentForm  data={row} openModal={openModal} content={<CreateForm data={row} close={() => setOpenModal(false)} />} />

                  </Grid>
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

};
export default Index;
