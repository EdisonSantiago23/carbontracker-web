import firebase from "../Firebase";
const db = firebase.firestore();

class RolService {
  newRol = (form,state) => {
    return db
      .collection("Roles")
      .doc()
      .set({
        Nombre:form.Nombre,
        Tag:form.Tag,
        Estado: true,
        ...state
      });
  };
  updateRol = (form,state,auxSn,id) => {
    return db
      .collection("Roles")
      .doc(id)
      .update({
        Nombre:form.Nombre,
        Tag:form.Tag,
        Menu:auxSn,
        ...state
      });
  };
  
  getRoles = (observer) => {
    return db
      .collection("Roles")
      .orderBy("Nombre", "asc")
      .onSnapshot(observer);
  };
}

export default new RolService();
