import firebase from "../Firebase";
const db = firebase.firestore();

class TratamientoService {
  getTratamiento = (observer, IdHospital, IdPaciente, idHistorial) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Pacientes")
      .doc(IdPaciente)
      .collection("Historial")
      .doc(idHistorial)
      .collection("Tratamiento")
      .orderBy("FechaAsignacion", "asc")
      .onSnapshot(observer);
  };
  newTratamiento = (data, IdHospital, IdPaciente, idHistorial,Tipo) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Pacientes")
      .doc(IdPaciente)
      .collection("Historial")
      .doc(idHistorial)
      .collection("Tratamiento")
      .add({
        Numero: 1,
        Medicamentos: JSON.stringify(data?.data),
        FechaAsignacion: new Date(),
        Detalle:data.detalle,
        Estado:JSON.stringify(data?.estado.data()),
        IdEstado:data.estado?.id,
        EnfermeroTurno:JSON.stringify(data?.enfermeroTurno),
        Tipo:Tipo
      });
  };
  
}

export default new TratamientoService();
