import { db } from "../../../../../Firebase";

export const getHispitales = observer => {
  return db.collection("HOSPITALES").onSnapshot(observer);
};
export const getHabitacionesByHospital = (observer, hospitalId) => {
  const npsd = hospitalId.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Habitaciones").doc(npsd[1]).collection("Equipos").onSnapshot(observer);
};
export const deleteBomba = (idBomba, idHispital) => {
  const npsd = idHispital.split("&&&&");
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Habitaciones").doc(npsd[1]).collection("Equipos").doc(idBomba).delete();
};
export const getUserByConjunto = (observer, conjuntoID) => {
  return db.collection("usuarios").where("ConjuntoUidResidencia", "==", conjuntoID).onSnapshot(observer);
};
export const newBomba = (data, idHispital) => {
  const npsd = idHispital.split("&&&&");
  console.log('npsdnpsd', npsd);
  return db.collection("HOSPITALES").doc(npsd[0]).collection("Equipos").doc("Bomba " + data.Numero).set({
    Nombre: data.Nombre,
    Detalle: data.Detalle,
    NombrePaciente: data.NombrePaciente,
    CedulaPaciente: data.CedulaPaciente,
    habitacionId: npsd[1],
    FechaRegistro: new Date()
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
export const getBitacora = (observer, conjuntoID) => {
  return db.collection("conjuntos").doc(conjuntoID).collection("bitacoraDigital").onSnapshot(observer);
};
export const updateUltimaExpensaConjunto = (idConjunto, UltimoMesAlicuota) => {
  return db.collection("conjuntos").doc(idConjunto).update({
    UltimoMesAlicuota: UltimoMesAlicuota
  });
};
export const getConjunto = conjuntoId => {
  return db.collection("conjuntos").doc(conjuntoId).get();
};
export const getUser = userId => {
  return db.collection("usuarios").doc(userId).get();
};
export const getUsuariosMorosos = (conjuntoUid, userId) => {
  return db.collection("conjuntos").doc(conjuntoUid).collection("cuentasPorCobrar").where("UsuarioId", "==", userId).get();
};
export const getRubros = (observer, conjuntoUid, tipo) => {
  return db.collection("conjuntos").doc(conjuntoUid).collection("rubros").where("Tipo", "==", tipo).onSnapshot(observer);
};
export const getSubRubros = (conjuntoUid, Rubroid) => {
  return db.collection("conjuntos").doc(conjuntoUid).collection("rubros").doc(Rubroid).get();
};