import React from "react";
import { DocumentosService } from "@services";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { DocumentosTabla } from "@config"
import CreateForm from "./CreateForm";
import { TablePage, ContentForm, Container, confirmDialog, Iconify } from "@components";
import TableCell from "@mui/material/TableCell";
import useAuth from "../../contextapi/hooks/useAuth";


const Index = () => {
  let nombre = 'Soporte';
  const [filteredData, setFilteredData] = React.useState({ data: [], page: 0, rowsPerPage: 5 });
  const [openModal, setOpenModal] = React.useState(false);
  const [usuario, setUsuarios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { user } = useAuth();
  const IdHospital = user.IdHospital;
  React.useEffect(() => {
    getSoportes();
  }, [getSoportes]);

  const getSoportes = React.useCallback(() => {
    DocumentosService.getDocumentoById(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setUsuarios(Items);
        },
      }, IdHospital);
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
    DocumentosService.deleteDocumento(IdHospital, IdRegistro).then(() => {
      enqueueSnackbar("Enfermero eliminado correctamente", { variant: "success" });
    });
  };
  const abrirURL = (url) => {
    const urlExterna = url;
    window.location.href = urlExterna;
  };
  return <Container loading={loading} titulo={nombre} component={<ContentForm openModal={openModal} content={<CreateForm IdHospital={IdHospital} close={() => setOpenModal(false)} />} />}>
    <Box mt={2}>
      <TablePage
        titulo={nombre}
        Cabecera={DocumentosTabla()}
        Lista={usuario}
        returnList={obtenerFIltrado}
        contenidoTabla={filteredData.data.slice(filteredData.page * filteredData.rowsPerPage, filteredData.page * filteredData.rowsPerPage + filteredData.rowsPerPage).map((row, index) => {
          const { Nombre, Url } = row.data();
          return (
            <TableRow hover key={index.toString()} tabIndex={-1} >
              <TableCell align="left">{Nombre}</TableCell>
              <TableCell align="left">
                <a id="anchorID" href={Url} target="_blank">
                  <Iconify icon={'uiw:document'} tooltip={"Abrir"} />
                </a>



              </TableCell>

              <TableCell align="left">
                <Grid
                  container
                  spacing={0}

                >
                  {/* <Grid>
                    <ContentForm data={row} openModal={openModal} content={<CreateForm data={row} close={() => setOpenModal(false)} />} />

                  </Grid> */}
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
