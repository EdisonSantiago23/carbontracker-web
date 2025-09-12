import { db } from "../../../../../Firebase";

export const getHispitales = observer => {
  return db.collection("HOSPITALES").onSnapshot(observer);
};
export const getEnfermeros = (observer, idBomba) => {
  return db.collection("HOSPITALES").doc(idBomba).collection("Enfermeros").onSnapshot(observer);
};
export const getHabitacionesByHospital = (observer, hospitalId, areaId) => {
  console.log();
  return db.collection("HOSPITALES").doc(hospitalId).collection("Habitaciones").where("areaId", "==", areaId).onSnapshot(observer);
};
export const getEquipsByHabitacionAux = async (observer, idHospitales, habitacionId) => {
  const querySnapshot = await db.collection("HOSPITALES").doc(idHospitales).collection("Equipos").where("habitacionId", "==", habitacionId).where("idPaciente", "!=", null).orderBy('idPaciente', 'desc').onSnapshot(observer);
  ;
  return querySnapshot;
};
export const getHabitacionesByHospitalFilter = (observer, hospitalId, areaId, email) => {
  console.log();
  return db.collection("HOSPITALES").doc(hospitalId).collection("Habitaciones").where("areaId", "==", areaId).where("areaId", "==", areaId).onSnapshot(observer);
};
export const getUserByConjunto = (observer, conjuntoID) => {
  return db.collection("usuarios").where("ConjuntoUidResidencia", "==", conjuntoID).onSnapshot(observer);
};
export const newHabitacion = (data, idHispital, areaId) => {
  return db.collection("HOSPITALES").doc(idHispital).collection("Areas").doc(areaId).collection("Habitaciones").add({
    Nombre: data.Nombre,
    Numero: data.Numero,
    NombreEncargado: data.NombreEncargado,
    CedulaEncargado: data.CedulaEncargado,
    FechaRegistro: new Date()
  });
};
export const asignarEnfermero = (data, idHispital, idDoc) => {
  return db.collection("HOSPITALES").doc(idHispital).collection("Habitaciones").doc(idDoc).update({
    idEncargado: data.idEncargado,
    datosEncargado: JSON.stringify(data.datosEncargado)
  });
};
export const updateHabitacion = (data, idHispital, idDoc, areaId) => {
  return db.collection("HOSPITALES").doc(idHispital).collection("Areas").doc(areaId).collection("Habitaciones").doc(idDoc).update({
    Nombre: data.Nombre,
    Numero: data.Numero,
    NombreEncargado: data.NombreEncargado,
    CedulaEncargado: data.CedulaEncargado,
    FechaRegistro: new Date()
  });
};
export const deleteBomba = (idBomba, idHispital) => {
  return db.collection("HOSPITALES").doc(idHispital).collection("Habitaciones").doc(idBomba).delete();
};