import firebase from "../Firebase";
const db = firebase.firestore();

class MenuService {
  newMenu = (form) => {
    return db
      .collection("Menu")
      .doc()
      .set({
        Title: form.Title,
        Path: form.Path,
        Icon: form.Icon,
        Orden: form.Orden,
        Estado: true,
        FechaRegistro: new Date(),
      });
  };
  updateMenu= (form, id) => {
    return db
      .collection("Menu")
      .doc(id)
      .update({
        Title: form.Title,
        Path: form.Path,
        Icon: form.Icon,
        Orden: form.Orden,

        
      });
  };

  getMenu = (observer, id) => {
    return db
      .collection("Menu")
      .orderBy("Orden", "asc")
      .onSnapshot(observer);
  };
}

export default new MenuService();
