import firebase from "../Firebase";
const db = firebase.firestore();
const nombreTabla="Estados";
class EstadosService {
  newEstado = (form,state) => {
    return db
      .collection(nombreTabla)
      .doc()
      .set({
        Nombre:form.Nombre,
        Tag:form.Tag,
        Estado: true,
        ...state
      });
  };
  updateEstado = (form,state,id) => {
    return db
      .collection(nombreTabla)
      .doc(id)
      .update({
        Nombre:form.Nombre,
        Tag:form.Tag,

        ...state
      });
  };
  
  getEstados = (observer) => {
    return db
      .collection(nombreTabla)
      .orderBy("Nombre", "asc")
      .onSnapshot(observer);
  };
}

export default new EstadosService();
