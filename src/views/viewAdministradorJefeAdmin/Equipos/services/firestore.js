import { db } from "../../../../Firebase";

export const getHispitales = (observer, idBomba) => {
  return db.collection("HOSPITALES").doc(idBomba).collection("Pacientes").where("Estado", "==", true).onSnapshot(observer);
};
export const getUserByConjunto = (observer, conjuntoID) => {
  return db.collection("usuarios").where("ConjuntoUidResidencia", "==", conjuntoID).onSnapshot(observer);
};
export const deleteBomba = (idBomba, id) => {
  return db.collection("HOSPITALES").doc(id).collection("Pacientes").doc(idBomba).delete();
};
export const updatePaciente = (id, threadKey) => {
  return db.collection("HOSPITALES").doc(threadKey).collection("Pacientes").doc(id).update({
    Estado: false,
    FechaSalida: new Date()
  });
};
export const asignarpaciente = (data, idHispital, idDoc) => {
  console.error('datadata', data);
  data.Estado = true;
  data.FechaIngreso = new Date();
  return db.collection("HOSPITALES").doc(idHispital).collection("Equipos").doc(idDoc).update({
    idPaciente: data?.Cedula,
    datosPaciente: JSON.stringify(data)
  });
};
export const getHabitacionesByHospital = (observer, hospitalId, areaId) => {
  console.log('hospitalId', hospitalId);
  console.log('areaId', areaId);
  return db.collection("HOSPITALES").doc(hospitalId).collection("Habitaciones").where("areaId", "==", areaId).onSnapshot(observer);
};
export const getCamasByHabitacion = (observer, hospitalId, habitacionId) => {
  return db.collection("HOSPITALES").doc(hospitalId).collection("Equipos").where("habitacionId", "==", habitacionId).onSnapshot(observer);
};
export const getAreaById = (observer, hospitalId) => {
  console.log('hospitalId', hospitalId);
  return db.collection("HOSPITALES").doc(hospitalId).collection("Areas").onSnapshot(observer);
};
export const getEquiposById = (observer, hospitalId) => {
  console.log('hospitalId', hospitalId);
  return db.collection("HOSPITALES").doc(hospitalId).collection("Equipos").onSnapshot(observer);
};
export const newHospital = (data, threadKey) => {
  console.error('datadatadata', data.habitacion.data());
  return db.collection("HOSPITALES").doc(threadKey).collection("Pacientes").doc(data.Cedula).set({
    Nombre: data.Nombre,
    Cedula: data.Cedula,
    Edad: data.Edad,
    Estado: true,
    Apellido: data.Apellido,
    Diagnostico: data.Diagnostico,
    FechaIngreso: new Date(),
    cama: data.cama,
    area: data.area,
    habitacion: data.habitacion.data().Nombre
  });
};
export const updateHospital = (data, id, threadKey) => {
  return db.collection("HOSPITALES").doc(threadKey).collection("Pacientes").doc(id).update({
    Nombre: data.Nombre,
    Cedula: data.Cedula,
    Edad: data.Edad,
    Estado: true,
    Apellido: data.Apellido,
    Diagnostico: data.Diagnostico,
    FechaIngreso: new Date()
  });
};
export const newUser = values => {
  return db.collection("usuarios").doc(values.Correo).set({
    Nombre: values.Nombre,
    Apellido: values.Apellido,
    Cedula: values.Cedula,
    Correo: values.Correo,
    Telefono: values.Telefono,
    Alicuota: values.Alicuota,
    Casa: values.Casa1 + values.Casa,
    Rol: values.Rol,
    ConjuntoUidResidencia: values.ConjuntoUidResidencia
  });
};
export const updateUser = values => {
  return db.collection("usuarios").doc(values.Correo).update({
    Nombre: values.Nombre,
    Apellido: values.Apellido,
    Cedula: values.Cedula,
    Correo: values.Correo,
    Telefono: values.Telefono,
    Alicuota: values.Alicuota,
    Casa: values.Casa,
    ConjuntoUidResidencia: values.ConjuntoUidResidencia
  });
};