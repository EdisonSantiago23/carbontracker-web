import firebase from "../Firebase";
const db = firebase.firestore();

class EnfermerosService {

 updateEnfermero = (data,id,threadKey) => {
    return db
      .collection("Empresas")
      .doc(threadKey)
      .collection("Enfermeros")
      .doc(id)
      .update({
        Nombre: data.Nombre,
        Cedula: data.Cedula,
        Apellido: data.Apellido,
        FechaRegistro: new Date(),
      });
  };
  newEnfermero = (data,threadKey) => {
    return db
      .collection("Empresas")
      .doc(threadKey)
      .collection("Enfermeros")
      .doc(data.Cedula)
      .set({
        Nombre: data.Nombre,
        Cedula: data.Cedula,
        Apellido: data.Apellido,
        FechaRegistro: new Date(),
      });
  };
  getEnfermerosByHospital = (observer, IdHospital) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Enfermeros")
      .onSnapshot(observer);
  };
  deleteEnfermero = (idBomba,id) => {
    return db
      .collection("Empresas")
      .doc(id)
      .collection("Enfermeros")
      .doc(idBomba)
      .delete();
  };
  
}

export default new EnfermerosService();
