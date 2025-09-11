import { db } from "../../../../Firebase";

export const getHispitales = observer => {
  return db.collection("HOSPITALES").onSnapshot(observer);
};
export const getUserByConjunto = (observer, conjuntoID) => {
  return db.collection("usuarios").where("ConjuntoUidResidencia", "==", conjuntoID).onSnapshot(observer);
};
export const deleteBomba = idBomba => {
  return db.collection("HOSPITALES").doc(idBomba).delete();
};
export const newHospital = data => {
  return db.collection("HOSPITALES").doc().set({
    Nombre: data.Nombre,
    Direccion: data.Direccion,
    Telefono: data.Telefono,
    FechaRegistro: new Date(),
    Detalle: data.Detalle
  });
};
export const updateHospital = (data, id) => {
  return db.collection("HOSPITALES").doc(id).update({
    Nombre: data.Nombre,
    Direccion: data.Direccion,
    Telefono: data.Telefono,
    FechaRegistro: new Date(),
    Detalle: data.Detalle
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