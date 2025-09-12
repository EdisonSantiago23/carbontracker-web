import { db } from "../../../Firebase";
 //adminconjuntos

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};
export const newConjunto = userName => {
  return db.collection("conjuntos").add({
    Nombre: userName.Nombre,
    Ruc: userName.Ruc,
    Imagen: userName.Imagen,
    NumResidentes: userName.NumResidentes,
    NumParqueaderos: userName.NumParqueaderos,
    Direccion: userName.Direccion,
    Ciudad: userName.Ciudad,
    Provincia: userName.Provincia,
    NombreContacto: userName.NombreContacto,
    TelefonoContacto: userName.TelefonoContacto,
    CorreoContacto: userName.CorreoContacto
  });
};
export const updateConjunto = (userName, documentoId) => {
  return db.collection("conjuntos").doc(documentoId).update({
    Nombre: userName.Nombre,
    Ruc: userName.Ruc,
    Imagen: userName.Imagen,
    NumResidentes: userName.NumResidentes,
    NumParqueaderos: userName.NumParqueaderos,
    Direccion: userName.Direccion,
    Ciudad: userName.Ciudad,
    Provincia: userName.Provincia,
    NombreContacto: userName.NombreContacto,
    TelefonoContacto: userName.TelefonoContacto,
    CorreoContacto: userName.CorreoContacto
  });
};
export const uploadImage = async (Imagen, name) => {
  let file = Imagen;
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var uploadTask = storageRef.child("fotoconjuntos/" + name).put(file);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
    var progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  }, error => {
    throw error;
  }, () => {
    uploadTask.snapshot.ref.getDownloadURL().then(url => {});
  });
  return null;
};
export const deleteConjuntoById = userName => {
  return db.collection("conjuntos").doc(userName).delete();
};
export const getBombas = (observer, idHospitales) => {
  return db.collection("HOSPITALES").doc(idHospitales).collection("Habitaciones").onSnapshot(observer);
};
export const getEquips = (observer, idHospitales) => {
  return db.collection("HOSPITALES").doc(idHospitales).collection("Equipos").orderBy('Fecha', 'desc').onSnapshot(observer);
};
export const getEquipos = (observer, idHospitales, idHabitacion) => {
  return db.collection("HOSPITALES").doc(idHospitales).collection("Habitaciones").doc(idHabitacion).collection("Equipos").onSnapshot(observer);
};
export const getAllProvincias = observer => {
  return db.collection("provincias").onSnapshot(observer);
};
export const getCiudadesByProvincias = (Ciudad, observer) => {
  return db.collection("provincias").doc(Ciudad).collection("canton").onSnapshot(observer);
};
export const createRubros = (conjuntoID, data) => {
  return db.collection("conjuntos").doc(conjuntoID).collection("rubros").doc(data.Nombre).set({
    Nombre: data.Nombre,
    Tipo: data.Tipo,
    SubRubros: data.SubRubros
  });
}; //endconjuntos