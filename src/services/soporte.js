import firebase from "../Firebase";
const db = firebase.firestore();

class SoporteService {
  getSoportes = (observer) => {
    return db.collection("Soporte").onSnapshot(observer);
  };
  deleteSoporte = (idBomba) => {
    return db
      .collection("Soporte")
      .doc(idBomba)
      .delete();
  };
   newSoporte = (data) => {
    return db
      .collection("Soporte")
      .doc()
      .set({
        Nombre: data.Nombre,
        Direccion: data.Direccion,
        Telefono: data.Telefono,
        FechaRegistro: new Date(),
        Detalle: data.Detalle,
        Correo: data.Correo,
  
      });
  };
  updateSoporte = (data,id) => {
    return db
      .collection("Soporte")
      .doc(id)
      .update({
        Nombre: data.Nombre,
        Direccion: data.Direccion,
        Telefono: data.Telefono,
        FechaRegistro: new Date(),
        Detalle: data.Detalle,
        Correo: data.Correo,
      });
  };
  
}

export default new SoporteService();
