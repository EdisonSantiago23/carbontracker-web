import firebase from "../Firebase";
const db = firebase.firestore();
const storage = firebase.storage();

class HospitalService {
  newHospital = (data) => {
    return db
      .collection("Hospitales")
      .doc()
      .set({
        Nombre: data.Nombre,
        Direccion: data.Direccion,
        Telefono: data.Telefono,
        FechaRegistro: new Date(),
        Detalle: data.Detalle,
      //  LogoImg: data?.logoImg,
        Estado: true,
      });
  };
  updateHospital = (data, id) => {
    return db
      .collection("Hospitales")
      .doc(id)
      .update({
        Nombre: data.Nombre,
        Direccion: data.Direccion,
        Telefono: data.Telefono,
        FechaRegistro: new Date(),
        Detalle: data.Detalle,
      //  LogoImg: data?.logoImg,
      });
  };
  getHispitalById = async (IdHospital) => {
    return await db
      .collection("Hospitales")
      .doc(IdHospital)
      .get();
  };
  getHospitales = (observer) => {
    return db.collection("Hospitales").onSnapshot(observer);
  };

  asignarEnfermero = (data, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .update({
        IdSoporte: data.IdSoporte,
        datosSoporte: JSON.stringify(data.datosSoporte),
      });
  };

  eliminarHospital = (IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .delete();
  };
  estadoHospital = (Hospital) => {
    return db
      .collection("Hospitales")
      .doc(Hospital.id)
      .update({
        Estado: !Hospital.data().Estado,
      });
  };
  subirImagenes = async (imageAsFile) => {
    try {
      const storageRef = storage.ref(`/images/hospitales/${imageAsFile.name}`);
      await storageRef.put(imageAsFile);
      const urlDownloadImage = await storageRef.getDownloadURL();
      return urlDownloadImage;
    } catch (error) {
      console.error("Error al subir imagen:", error);
      return null;
    }
  };
}

export default new HospitalService();
