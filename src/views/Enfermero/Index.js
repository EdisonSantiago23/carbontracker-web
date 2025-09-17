import React from "react";
import {Grid,Box,TableCell,TableRow} from "@mui/material";
import {TablePage,ContentForm, Container, confirmDialog, Iconify } from "@components";
import { EnfermerosService } from '@services';
import { EnfermeroTabla } from "@config"

import useAuth from "../../contextapi/hooks/useAuth";
import CreateForm from "./CreateForm";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";



const Index = () => {
  let location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  let nombre = 'Enfermero';
  const [usuario, setUsuarios] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState({ data: [], page: 0, rowsPerPage: 5 });
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  
  const { user } = useAuth();
  const IdHospital = user.IdHospital;
  React.useEffect(() => {
    getEnfermeros();
  }, [getEnfermeros]);
  const getEnfermeros = React.useCallback(() => {
    EnfermerosService.getEnfermerosByHospital(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setUsuarios(Items);
        },
      },
      IdHospital
    );
    setLoading(false);
  }, [IdHospital]);



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
  return <Container loading={loading} titulo={nombre} component={<ContentForm  openModal={openModal} content={<CreateForm close={() => setOpenModal(false)}/>} />}>
    <Box mt={2}>
      <TablePage
        titulo={nombre}
        Cabecera={EnfermeroTabla()} 
        Lista={usuario}
        returnList={obtenerFIltrado}
        contenidoTabla={filteredData.data.slice(filteredData.page * filteredData.rowsPerPage, filteredData.page * filteredData.rowsPerPage + filteredData.rowsPerPage).map((row, index) => {
          const { Nombre, Apellido, Cedula } = row.data();
          return (
            <TableRow hover key={index.toString()} tabIndex={-1} >
              <TableCell align="left">{Nombre}</TableCell>
              <TableCell align="left">{Apellido}</TableCell>
              <TableCell align="left">{Cedula}</TableCell>
              <TableCell align="left">
                <Grid container>
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
