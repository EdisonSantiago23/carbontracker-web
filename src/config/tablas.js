
export const HospitalesTabla = () => {
  const columns = [
    { id: "estado", label: "Estado" },
    { id: "name", label: "Logo" },
    { id: "name", label: "Nombre" },
    { id: "acciones", label: "Acciones" },
  ];

  return columns;
};
export const PersonalTabla = () => {
  const columns = [
    { id: "cedula", label: "Estado" },
    { id: "name", label: "Nombre" },
    { id: "numero", label: "Apellido" },
    { id: "nombreencargado", label: "Cédula" },
    { id: "cedulaencargado", label: "Correo" },
    { id: "cedulaencargado", label: "Rol" },
  
    { id: "acciones", label: "Acciones" },
  ];
  return columns;
};

export const EquiposTabla = () => {
  const columns = [
    { id: "cedula", label: "Estado" },
    { id: "cedula", label: "Estado equipo" },
    { id: "name", label: "Serie" },
    { id: "cedula", label: "Modelo" },
    { id: "cedula", label: "Código" },
    { id: "cedula", label: "Alambrico" },
    { id: "Acciones", label: "Acciones" },

  ];
  return columns;
};
export const HabitacionesTabla = () => {
  const columns = [
    { id: "name", label: "Estado" },
    { id: "name", label: "Nombre" },
    { id: "numero", label: "Capacidad" },
    { id: "numero", label: "Camas" },
    { id: "numero", label: "Encargado" },
    { id: "acciones", label: "Acciones" },
  ];
  return columns;
};
export const CamasTabla = () => {
  const columns = [
    { id: "name", label: "Estado" },
    { id: "name", label: "Nombre" },
    { id: "asignar", label: "Equipo" },
    { id: "accion", label: "Acciones" },
  ];
  return columns;
};
export const PacientesTabla = () => {
  const columns = [
    { id: "name", label: "Estado" },
    { id: "name", label: "Estado paciente" },
    { id: "name", label: "Nombre" },
    { id: "apellido", label: "Apellido" },
    { id: "cedula", label: "Cédula" },
    { id: "alta", label: "Paciente" },
    { id: "acciones", label: "Acciones" },
  ];
  return columns;
};
export const EstadosTabla = () => {
  const columns = [
    { id: "name", label: "Nombre" },
    { id: "name", label: "Tag" },
    { id: "acciones", label: "Acciones" },
  ];
  return columns;
};
export const FuncionalidadesTabla = () => {
  const columns = [
    { id: "name", label: "Nombre" },
    { id: "acciones", label: "Tag" },
  ];
  return columns;
};
export const RolesTabla = () => {
  const columns = [
    { id: "name", label: "Nombre" },
    { id: "name", label: "Tag" },
    { id: "acciones", label: "Acciones" },
  ];
  return columns;
};
export const EnfermeroTabla = () => {
  const columns = [
    { id: "asignar", label: "Nombre" },
    { id: "asignar", label: "Apellido" },
    { id: "name", label: "Celular" },
    { id: "name", label: "Acciones" }
  
  ];
  return columns;
};
export const EstadisticasTabla = () => {
  const columns = [
    { id: "asignar", label: "Serie Equipo" },
    { id: "asignar", label: "Habitación" },
    { id: "name", label: "Fecha prendido" },
    { id: "name", label: "Hora prendido" },
    { id: "detalle", label: "Fecha apagado" },
    { id: "detalle", label: "Hora apagado" },
    { id: "detalle", label: "Tiempo" },
  
  ];
  return columns;
};
export const SoporteTabla = () => {
  const columns = [
    { id: "name", label: "Nombre" },
    { id: "Correo", label: "Correo" },
    { id: "direccion", label: "Dirección" },
    { id: "telefono", label: "Teléfono" },
    { id: "detalle", label: "Detalle" },
    { id: "acciones", label: "Acciones" },
  ];
  return columns;
};
export const DocumentosTabla = () => {
  const columns = [
    { id: "name", label: "Nombre" },
    { id: "Documento", label: "Documento" },
    { id: "acciones", label: "Acciones" },
  ];
  return columns;
};
export const TratamientoTabla = () => {
  const columns = [
    { id: "name", label: "Fecha" },
    { id: "apellido", label: "Estado" },
    { id: "apellido", label: "Detalle" },
    { id: "apellido", label: "Encargado" },
    { id: "apellido", label: "Medicamento" },
    { id: "cedula", label: "Compatibilidad sugerida" },
  ];
  return columns;
};
export const ReporteTabla = () => {
  const columns = [
    { id: "time", label: "COMENTARIOS OBSERVACIONES	" },
    { id: "time", label: "FECHA" },
  ];
  return columns;
};
export const MedicamentoTabla = () => {
  const columns = [
    { id: "name", label: "Nombre" },
    { id: "apellido", label: "Número de dósis" },
    { id: "acciones", label: "Acciones" },
  ];
  return columns;
};

export const MenuTabla = () => {
  const columns = [
    
    { id: "Orden", label: "Orden" },
    { id: "name", label: "Título" },
    { id: "acciones", label: "Path" },
    { id: "acciones", label: "Ícono" },
    { id: "acciones", label: "Acciones" },

  ];
  return columns;
};

export const MedicamentosCombinaTabla = () => {
  const columns = [
    { id: "name", label: "Fecha" },
    { id: "apellido", label: "Tipo de medicamento" },
    { id: "apellido", label: "Detalle" },
    { id: "apellido", label: "Encargado" },
    { id: "apellido", label: "Medicamento" },
    { id: "cedula", label: "Compatibilidad sugerida" },
  ];
  return columns;
};

