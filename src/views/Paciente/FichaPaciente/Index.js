import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ContentForm, RegistroAdmicion, AccidentesQuemaduras } from '@components'
import AppWidgetSummary from "../../../components/AppWidgetSummary/AppWidgetSummary";



const Index = () => {

  return (
    <Box sx={{ minWidth: 400 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Datos del paciente"
            total={1}
            titleSub="Registro de admisión"
            ics={<ContentForm
              data={true}
              titulo={"Datos del paciente"}
              icono={'ic:round-personal-injury'}
              content={<RegistroAdmicion />}
            />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Accidente,violencia, intoxicación, envenenamiento o quemadura"
            total={2}
            titleSub="Accidentes"
            icon={'maki:road-accident'}
            ics={<ContentForm
              data={true}
              titulo={"Accidentes"}
              icono={'maki:road-accident'}
              content={<AccidentesQuemaduras />}
            />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Antecedentes personales y familiares" total={3} titleSub="Antecedentes paciente" icon={'fontisto:bed-patient'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Enfermedad actual y revision de sistemas" total={4} titleSub="Enfermedad" icon={'healthicons:virus-patient'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Signos vitales, mediciones y valores" total={5} titleSub="Signos vitales" icon={'healthicons:virus-patient'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Examen físico y diagnostico" total={6} titleSub="Examen físico" icon={'healthicons:physical-therapy'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Localización de lesiones" total={7} titleSub="Localización de lesiones" icon={'material-symbols:wounds-injuries-rounded'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Emergencia obstétrica" total={8} titleSub="Emergencia obstétrica" icon={'healthicons:obstetricsmonia'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Solicitud de exámenes" total={9} titleSub="Solicitud de exámenes" icon={'healthicons:i-exam-multiple-choice-outline'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Diagnostico de ingreso" total={10} titleSub="Diagnostico de ingreso" icon={'dashicons:admin-post'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Diagnostico de alta" total={11} titleSub="Diagnostico de alta" icon={'mdi:report-arc'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Plan de tratamiento" total={12} titleSub="Plan de tratamiento" icon={'healthicons:water-treatment'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Alta" total={13} titleSub="Alta" icon={'material-symbols:diagnosis-outline-sharp'} />
        </Grid>
      </Grid>
    </Box>
  );

}

export default Index;
