import firebase from "../Firebase";
const db = firebase.firestore();

class EquipoHistorialService {
  getHistorial = (observer,IdHospital) => {
    return db
    .collection("Hospitales")
    .doc(IdHospital)
    .collection("HistorialEquipos")
    .orderBy("FechaOn", "desc")
    .limit(10)
    .onSnapshot(observer);
  };
  getHistorialById = (observer,IdHospital,IdArea) => {
    return db
    .collection("Hospitales")
    .doc(IdHospital)
    .collection("HistorialEquipos")
    .where("IdArea", "==", IdArea)
    .orderBy("FechaOn", "desc")
    .limit(10)
    .onSnapshot(observer);
  };

  
}

export default new EquipoHistorialService();
