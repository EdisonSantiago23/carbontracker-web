import firebase from "../Firebase";
const db = firebase.firestore();
class MedicamentoService {
  getMedicamentos = (observer) => {
    return db
      .collection("Medicamento")
      .orderBy("Nombre", "asc")
      .onSnapshot(observer);
  };

  deleteMedicamento = (idBomba) => {
    return db
      .collection("Medicamento")
      .doc(idBomba)
      .delete();
  };
  newMedicamento = (data) => {
    return db.collection("Medicamento").add({
      Nombre: data.Nombre,
      NumeroDosis: data.NumeroDosis,
      FechaRegistro: new Date(),
    });
  };
  updateMedicamento = (data, id) => {
    return db

      .collection("Medicamento")
      .doc(id)
      .update({
        Nombre: data.Nombre,
        NumeroDosis: data.NumeroDosis,
      });
  };
  getMedicamentosCombinar = (observer, idMedicamento) => {
    return db.collection("Medicamento").doc(idMedicamento).collection("Combinaciones").orderBy("medicamento", "asc").onSnapshot(observer);
  };
  getIdsa = async (medicamentoId, medicamentoAcombinarId) => {
    let data = [];
    await db
      .collection("Medicamento")
      .doc(medicamentoId)
      .collection("Combinaciones")
      .where("medicamentoAcombinarId", "==", medicamentoAcombinarId)
      .limit(1)
      .get()
      .then((res) => {
        if (res.docs.length > 0) {
          data.push(res.docs[0].data());
        }
      });
    return data;
  };
  getoConsultaAndyDelete = async (medicamentoId, medicamentoAcombinarId) => {
    let data = [];
    await db
      .collection("Medicamento")
      .doc(medicamentoId)
      .collection("Combinaciones")
      .where("medicamentoAcombinarId", "==", medicamentoAcombinarId)
      .get()
      .then((res) => {
        if (res.docs.length > 0) {
          res.docs.forEach((ress) => {
            db.collection("Medicamento")
              .doc(medicamentoId)
              .collection("Combinaciones")
              .doc(ress.id)
              .delete();
          });
        }
      });
    return data;
  };
  asignarMedicamento2 = (medicamentoId, medicamentoAcombinarId, tipo) => {
    return db
      .collection("Medicamento")
      .doc(medicamentoId)
      .collection("Combinaciones")
      .add({
        medicamentoAcombinarId: medicamentoAcombinarId.id,
        medicamento: medicamentoAcombinarId.data().Nombre,
        tipo: tipo,
        FechaRegistro: new Date(),
      });
  };
}

export default new MedicamentoService();
