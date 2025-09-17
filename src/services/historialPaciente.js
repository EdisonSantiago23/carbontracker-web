import firebase from "../Firebase";
const db = firebase.firestore();

class HistorialPacienteService {
  getHistorialByPaciente = (IdHospital, pacienteId) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Pacientes")
      .doc(pacienteId)
      .collection("Historial")
      .get();
  };
  getHistorialByUsers = (IdHospital, pacienteId) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Pacientes")
      .doc(pacienteId)
      .collection("Historial")
      .get();
  };
  updateHistorial = (threadKey, IdPaciente, idHistorial, DetalleSalida) => {
    return db
      .collection("Hospitales")
      .doc(threadKey)
      .collection("Pacientes")
      .doc(IdPaciente)
      .collection("Historial")
      .doc(idHistorial)
      .update({
        FechaSalida: new Date(),
        DetalleSalida: DetalleSalida,
      });
  };
  newHistoria = (data,datosCamas, idHistorial) => {

    return db
      .collection("Hospitales")
      .doc(idHistorial)
      .collection("Pacientes")
      .doc(data.Cedula)
      .collection("Historial")
      .add({
        FechaIngreso: new Date(),
        Diagnostico: data.Diagnostico,
        Area: datosCamas?.area ? JSON.stringify(datosCamas?.area.data()) : null,
        IdArea: datosCamas?.area ? datosCamas?.area.id : null,
        Habitacion: datosCamas?.habitacion ? JSON.stringify(datosCamas?.habitacion.data()) : null,
        IdHabitacion: datosCamas?.habitacion ? datosCamas?.habitacion.id : null,
        Cama: datosCamas.cama ? JSON.stringify(datosCamas.cama.data()) : null,
        IdCama: datosCamas.cama ? datosCamas.cama.id : null,
        Equipo: datosCamas.equipo ? JSON.stringify(datosCamas.equipo.data()) : null,
        IdEquipo: datosCamas.equipo ? datosCamas.equipo.id : null,
      });
  };
  getHistorialByUser = (observer, IdHospital, pacienteId) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Pacientes")
      .doc(pacienteId)
      .collection("Historial")
      .orderBy('FechaIngreso', 'desc')
      .onSnapshot(observer);
  };
}

export default new HistorialPacienteService();
