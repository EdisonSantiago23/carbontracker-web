import firebase from "../Firebase";
const db = firebase.firestore();

class FuncionalidadesSistemaService {
  newFuncionalidad = (form,id) => {
    return db
      .collection("Funcionalidad")
      .doc(id)
      .collection("FuncionalidadesSistema")
      .doc()
      .set({
        Nombre: form.Nombre,
        Tag: form.Tag,
        Estado: true,
      });
  };
  updateFuncionalidad = (form, id) => {
    return db
      .collection("Funcionalidad")
      .doc(id)
      .update({
        Nombre: form.Nombre,
        Tag: form.Tag,
      });
  };

  getFuncionalidadesSistema = (observer, id) => {
    return db
      .collection("Funcionalidad")
      .doc(id)
      .collection("FuncionalidadesSistema")
      .orderBy("Nombre", "asc")
      .onSnapshot(observer);
  };
}

export default new FuncionalidadesSistemaService();
