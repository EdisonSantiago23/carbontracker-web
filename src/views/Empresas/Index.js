import React from "react";
import {TableCell, Box, Select, MenuItem, Grid,  TableRow } from '@mui/material';
import { TablePage, ContentForm, Label, Container, confirmDialog, Iconify } from "@components";
import { EmpresasTabla } from "@config"
import { HospitalService, SoporteService } from '@services';
import { sentenceCase } from 'change-case';
import { useSnackbar } from "notistack";
import CreateForm from "./CreateForm";

const Index = () => {
  let nombre = 'Empresas';
  const [openModal, setOpenModal] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [Empresas, setEmpresas] = React.useState([]);
  const [soporte, setSoporte] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filteredData, setFilteredData] = React.useState({ data: [], page: 0, rowsPerPage: 5 });
  React.useEffect(() => {
    getAllEmpresas();
    getSoportes();
  }, [getAllEmpresas, getSoportes]);

  const getAllEmpresas = React.useCallback(() => {
    HospitalService.getEmpresas(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setEmpresas(Items);
        },
      });
    setLoading(false);
  }, []);
  const getSoportes = React.useCallback(() => {
    SoporteService.getSoportes(
      {
        next: (querySnapshot) => {
          const Items = querySnapshot.docs.map((docSnapshot) => docSnapshot);
          setSoporte(Items);
        },
      },
    );
  }, []);

  const desactivarHospital = (Hospital) => {
    let estado = !Hospital.data().Estado ? "Activar" : "Desactivar";
    confirmDialog("¿Estás seguro que deseas " + estado + " el hospital " + Hospital.data().Nombre + "?", () =>
      estadoHospital(Hospital, estado)
    );
  };
  const estadoHospital = (Hospital, estado) => {
    HospitalService.estadoHospital(Hospital).then(() => {
      enqueueSnackbar("Hospital " + estado + " correctamente", { variant: "success" });
    });
  };
  const eliminaHospital = (Hospital) => {
    confirmDialog('¿Estás seguro que deseas eliminar el hospital ' + Hospital.data().Nombre + "?", () =>
      eliminarHospital(Hospital.id)
    );
  };
  const eliminarHospital = (IdHospital) => {
    HospitalService.eliminarHospital(IdHospital).then(() => {
      enqueueSnackbar("Hospital eliminado correctamente", { variant: "success" });
    });
  };

  const handleChange = (valor, item) => {
    const pacienteData = soporte.find((x) => x.id == valor.target.value);
    item.IdSoporte = valor.target.value;
    item.datosSoporte = pacienteData.data();
    update(item);
  };
  const update = (item) => {
    HospitalService.asignarEnfermero(item, item.id).then((rss) => {
      enqueueSnackbar("Soporte asignado correctamente", {
        variant: "success",
      });
    });
  };
  const obtenerFIltrado = (res) => {
    setTimeout(() => {
      setFilteredData(res)
    }, 100);
  }
  return (
    <Container loading={loading} titulo={nombre} component={<ContentForm  openModal={openModal} content={<CreateForm close={() => setOpenModal(false)}/>} />}>

      <Box mt={2}>
        <TablePage
          titulo={nombre}
          Cabecera={EmpresasTabla()}
          Lista={Empresas}
          returnList={obtenerFIltrado}
          contenidoTabla={filteredData.data.slice(filteredData.page * filteredData.rowsPerPage, filteredData.page * filteredData.rowsPerPage + filteredData.rowsPerPage).map((row, index) => {
            const { Estado, LogoImg, Nombre } = row.data();
            return (
              <TableRow hover key={index.toString()} tabIndex={-1} >
                <TableCell align="left">
                  <Label color={Estado ? "success" : "error"}>{sentenceCase(Estado ? "Activo" : "Inactivo")}</Label>

                </TableCell>
                <TableCell align="left">
                  <Box component="img" src={LogoImg} alt={Nombre} sx={{ height: "70px", width: "auto" }} />

                </TableCell>
                <TableCell align="left">{Nombre}</TableCell>              
                <TableCell align="left">
                  <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justifyContent="center">
                    {row.data().Estado && <Grid>
                      <Iconify icon={'material-symbols:house'} tooltip={'Áreas'} link={"/administrador/areas/" + row.id} />
                    </Grid>}
                    {row.data().Estado && <Grid>
                      <Iconify icon={'ic:round-people'} tooltip={'Personal'} link={"/administrador/Empresas/personal/" + row.id} />
                    </Grid>}
                
                    {row.data().Estado && <Grid>
                      <ContentForm  data={row} openModal={openModal} content={<CreateForm data={row} close={() => setOpenModal(false)} />} />
                    </Grid>}
                    <Grid>
                      <Iconify icon={row.data().Estado ? 'material-symbols:auto-delete' : 'material-symbols:check-circle-outline-rounded'} tooltip={!row.data().Estado ? "Activar" : "Desactivar"} onClick={() => desactivarHospital(row)} />
                    </Grid>
                    {row.data().Estado && <Grid>
                      <Iconify icon={'material-symbols:delete-outline'} tooltip={"Eliminar"} onClick={() => eliminaHospital(row)} />
                    </Grid>}
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
