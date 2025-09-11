import { db } from "../../../../../Firebase";

export const getHispitales = observer => {
  return db.collection("HOSPITALES").onSnapshot(observer);
};
export const getHabitacionesByHospital = (observer, hospitalId) => {
  const npsd = hospitalId.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Equipos").where("habitacionId", "==", npsd[2]).onSnapshot(observer);
};
export const getHb = hospitalId => {
  const npsd = hospitalId.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Habitaciones").doc(npsd[2]).get();
};
export const deleteBomba = (idBomba, idHispital) => {
  const npsd = idHispital.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Equipos").doc(idBomba).delete();
};
export const getUserByConjunto = (observer, conjuntoID) => {
  return db.collection("usuarios").where("ConjuntoUidResidencia", "==", conjuntoID).onSnapshot(observer);
};
export const updateBomba = (data, idHispital, documentoId) => {
  const npsd = idHispital.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Equipos").doc(documentoId).update({
    Nombre: data.Nombre,
    Detalle: data.Detalle,
    Duracion: data.duracion,
    Numero: data.Numero.toString(),
    habitacionId: npsd[2],
    habitacionNombre: data?.habitacionNombre,
    Valor: data?.Valor,
    FechaRegistro: new Date()
  });
};
export const newBomba = (data, idHispital) => {
  const npsd = idHispital.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Equipos").doc("Bomba " + data.Numero.toString()).set({
    Nombre: data.Nombre,
    Detalle: data.Detalle,
    Duracion: data.duracion,
    Numero: data.Numero.toString(),
    habitacionId: npsd[2],
    Valor: data?.Valor,
    habitacionNombre: data?.habitacionNombre,
    FechaRegistro: new Date()
  });
};