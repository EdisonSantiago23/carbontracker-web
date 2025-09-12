import { db } from "../../../../Firebase";

export const getHabitaciones = (observer, conjuntoID) => {
  return db.collection("HOSPITALES").doc(conjuntoID).collection("Habitaciones").onSnapshot(observer);
};
export const getEquips = (observer, idHospitales) => {
  return db.collection("HOSPITALES").doc(idHospitales).collection("Equipos").onSnapshot(observer);
};
export const getEquipsByHabitacion = (observer, idHospitales, habitacionId) => {
  return db.collection("HOSPITALES").doc(idHospitales).collection("Equipos").where("habitacionId", "==", habitacionId).orderBy('idPaciente', 'desc').onSnapshot(observer);
};
export const getEquipsByHabitacionAux = (observer, idHospitales, habitacionId) => {
  return db.collection("HOSPITALES").doc(idHospitales).collection("Equipos").where("habitacionId", "==", habitacionId).where("idPaciente", "!=", null).orderBy('idPaciente', 'desc').onSnapshot(observer);
};