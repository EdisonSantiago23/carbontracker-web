import { db } from "../../../../Firebase";

export const getHispitales = (observer, idBomba) => {
  return db.collection("HOSPITALES").doc(idBomba).collection("Enfermeros").onSnapshot(observer);
};
export const getUserByConjunto = (observer, conjuntoID) => {
  return db.collection("usuarios").where("ConjuntoUidResidencia", "==", conjuntoID).onSnapshot(observer);
};
export const deleteBomba = (idBomba, id) => {
  console.log('idBomba', idBomba);
  return db.collection("HOSPITALES").doc(id).collection("Enfermeros").doc(idBomba).delete();
};
export const newHospital = (data, threadKey) => {
  console.log('threadKey', threadKey);
  return db.collection("HOSPITALES").doc(threadKey).collection("Enfermeros").doc(data.Cedula).set({
    Nombre: data.Nombre,
    Cedula: data.Cedula,
    Apellido: data.Apellido,
    FechaRegistro: new Date()
  });
};
export const updateHospital = (data, id, threadKey) => {
  return db.collection("HOSPITALES").doc(threadKey).collection("Enfermeros").doc(id).update({
    Nombre: data.Nombre,
    Cedula: data.Cedula,
    Apellido: data.Apellido,
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