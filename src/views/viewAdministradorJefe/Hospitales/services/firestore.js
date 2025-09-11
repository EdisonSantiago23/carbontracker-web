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