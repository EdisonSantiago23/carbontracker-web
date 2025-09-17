import firebase from "../Firebase";
const db = firebase.firestore();

class FuncionalidadService {
  newFuncionalidad = (form) => {
    return db
      .collection("Funcionalidad")
      .doc()
      .set({
        Nombre:form.Nombre,
        Tag:form.Tag,
        Estado: true,
      });
  };
  updateFuncionalidad = (form,id) => {
    return db
      .collection("Funcionalidad")
      .doc(id)
      .update({
        Nombre:form.Nombre,
        Tag:form.Tag,
      });
  };
  
  getFuncionalidad = (observer) => {
    return db
      .collection("Funcionalidad")
      .orderBy("Nombre", "asc")
      .onSnapshot(observer);
  };
}

export default new FuncionalidadService();
