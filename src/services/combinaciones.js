import firebase from "../Firebase";
const db = firebase.firestore();
class CombinacionesService {
  getCombinacionesByMedicamento = (observer, medicamentoId) => {
    return db
      .collection("Medicamento")
      .doc(medicamentoId)
      .collection("Combinaciones")
      .orderBy("medicamento", "asc")
      .onSnapshot(observer);
  
  };
}

export default new CombinacionesService();
