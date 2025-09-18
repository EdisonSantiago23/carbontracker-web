import firebase from "../Firebase";
const db = firebase.firestore();
class SeguimientoService {
  getSeguimiento = (
    observer,
    IdHospital,
    pacienteId,
    historialId,
    TratamientoId
  ) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Pacientes")
      .doc(pacienteId)
      .collection("Historial")
      .doc(historialId)
      .collection("Tratamiento")
      .doc(TratamientoId)
      .collection("Seguimiento")
      .onSnapshot(observer);
  };
 newSeguimiento = (
    numeroDosis,
    skipped,
    IdHospital,
    pacienteId,
    historialId,
    TratamientoId,
    estado,
    enfermeroTurno
  ) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Pacientes")
      .doc(pacienteId)
      .collection("Historial")
      .doc(historialId)
      .collection("Tratamiento")
      .doc(TratamientoId.id)
      .collection("Seguimiento")
      .add({
        Fecha: new Date(),
        Estado: true,
        NumeroDosis: numeroDosis,
        Skipped:skipped,
        IdTratamiento: TratamientoId.id,
        Tratamiento: JSON.stringify(TratamientoId.data()),
        IdEstadoDosis:estado.id,
        EstadoDosis: JSON.stringify(estado.data()),
        EnfermeroTurno:enfermeroTurno
      });
  };
}

export default new SeguimientoService();
