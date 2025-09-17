import firebase from "../Firebase";
const db = firebase.firestore();

class historialEquiposService {
  getHistorialFirstEquipos = (observer,IdHospitales, idEquipos) => {
  return  db.collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .doc(idEquipos)
      .collection("Historial")
      .orderBy("Fecha", "desc")
      .limit(1)
      .onSnapshot(observer);


  };
  getHistorialByEquipo = (observer,IdHospitales, idEquipos,filter) => {
    return  db.collection("Hospitales")
        .doc(IdHospitales)
        .collection("HistorialEquipos")
        .where('FechaOn', '>=', new Date(filter?.desde) )
        .where('FechaOn', '<=', new Date(filter?.hasta))
        .where("idEquipo", "==", idEquipos)
        .orderBy("FechaOn", "desc")
        .onSnapshot(observer);
  
  
    };
}

export default new historialEquiposService();
