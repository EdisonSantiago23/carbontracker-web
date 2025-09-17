import firebase from "../Firebase";
const db = firebase.firestore();

class BombasService {
  getAreaById = (observer, IdHospital) => {
    
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Areas")
      .onSnapshot(observer);
  };
  getHabitacionesByHospital = (observer, IdHospital, IdArea) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Habitaciones")
      .where("IdArea", "==", IdArea)
      .onSnapshot(observer);
  };
}

export default new BombasService();
