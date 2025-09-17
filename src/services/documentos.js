import firebase from "../Firebase";
const db = firebase.firestore();
const storage = firebase.storage()

class DocumentosService {
  newDocumento = (data, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Documentos")
      .add({
        Nombre: data.Nombre,
        Url: data.Url,
      });
  };
  deleteDocumento = (IdHospital, idDocumento) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Documentos")
      .doc(idDocumento)
      .delete();
  };
  getDocumentoById = (observer, IdHospital) => {
    console.error("IdHospital",IdHospital)
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Documentos")
      .orderBy('Nombre', 'desc')
      .onSnapshot(observer);
  };
  subirArchivos =async (imageAsFile) => {
    await storage.ref(`/archivos/hospitales/${imageAsFile.name}`).put(imageAsFile)
    let urlDownloadImage = await storage.ref('archivos/hospitales').child(imageAsFile.name).getDownloadURL();
    console.error("urlDownloadImage",urlDownloadImage)
    return(urlDownloadImage)
    
  }
}

export default new DocumentosService();
