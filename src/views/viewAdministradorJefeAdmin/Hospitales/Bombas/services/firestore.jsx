import { db } from "../../../../../Firebase";

export const getHispitales = observer => {
  return db.collection("HOSPITALES").onSnapshot(observer);
};
export const getHabitacionesByHospital = (observer, hospitalId) => {
  const npsd = hospitalId.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Equipos").where("habitacionId", "==", npsd[2]).onSnapshot(observer);
};
export const updatePaciente = (id, threadKey) => {
  const npsd = threadKey.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Pacientes").doc(id).update({
    Estado: false,
    FechaSalida: new Date()
  });
};
export const asignarpaciente = (data, idHispital, idDoc) => {
  const npsd = idHispital.split("&&&&");
  console.error(npsd);
  console.error(data);
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Equipos").doc(idDoc).update({
    idPaciente: data?.idPaciente,
    datosPaciente: JSON.stringify(data?.datosPaciente)
  });
};
export const getPacientes = (observer, idBomba) => {
  const npsd = idBomba.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Pacientes").where("Estado", "==", true).onSnapshot(observer);
};
export const getHb = hospitalId => {
  const npsd = hospitalId.split("&&&&");
  console.log("npsd", npsd);
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
    NombrePaciente: data.NombrePaciente,
    CedulaPaciente: data.CedulaPaciente,
    CedulaPaciente: data.CedulaPaciente,
    habitacionId: npsd[2],
    areaId: npsd[1],
    habitacionNombre: data?.habitacionNombre,
    NombreEncargado: data?.NombreEncargado,
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
    NombrePaciente: data.NombrePaciente,
    CedulaPaciente: data.CedulaPaciente,
    CedulaPaciente: data.CedulaPaciente,
    habitacionId: npsd[2],
    areaId: npsd[1],
    habitacionNombre: data?.habitacionNombre,
    NombreEncargado: data?.NombreEncargado,
    Valor: data?.Valor,
    FechaRegistro: new Date()
  });
};