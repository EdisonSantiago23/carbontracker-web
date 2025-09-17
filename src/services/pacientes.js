import firebase from "../Firebase";
const db = firebase.firestore();

class PacienteService {
  newPaciente = (data, threadKey, seguroPrivado) => {
    return db
      .collection("Hospitales")
      .doc(threadKey)
      .collection("Pacientes")
      .doc(data.Cedula)
      .set({
        Nombre: data.Nombre,
        Cedula: data.Cedula,
        FechaNacimiento: data.FechaNacimiento,
        Estado: true,
        EstadoPaciente: 1,
        Apellido: data.Apellido,
        SeguroPrivado: seguroPrivado,
        NombreContacto: data.NombreContacto,
        ApellidoContacto: data.ApellidoContacto,
        CedulaContacto: data.CedulaContacto,
        CelularContacto: data.CelularContacto,
        ParentezcoContacto: data.ParentezcoContacto,
        Diagnostico: data.Diagnostico,
        FechaCreacion: new Date(),
      });
  };
  updatePaciente = (data,datosCamas, id, threadKey, seguroPrivado) => {
    return db
      .collection("Hospitales")
      .doc(threadKey)
      .collection("Pacientes")
      .doc(id)
      .update({
        Area: datosCamas?.area ? JSON.stringify(datosCamas?.area.data()) : null,
        IdArea: datosCamas?.area ? datosCamas?.area?.id : null,
        Habitacion: datosCamas?.habitacion ? JSON.stringify(datosCamas?.habitacion.data()) : null,
        IdHabitacion: datosCamas?.habitacion ? datosCamas?.habitacion?.id : null,
        Cama: datosCamas.cama ? JSON.stringify(datosCamas?.cama.data()) : null,
        IdCama: datosCamas.cama ? datosCamas.cama?.id : null,
        Equipo: datosCamas.equipo ? JSON.stringify(datosCamas.equipo.data()) : null,
        IdEquipo: datosCamas.equipo ? datosCamas.equipo?.id : null,
        Nombre: data.Nombre,
        Cedula: data.Cedula,
        FechaNacimiento: data.FechaNacimiento,
        Apellido: data.Apellido,
        Diagnostico: data.Diagnostico,
        FechaActualizacion: new Date(),
        Estado: true,
        SeguroPrivado: seguroPrivado,
        NombreContacto: data.NombreContacto,
        ApellidoContacto: data.ApellidoContacto,
        CedulaContacto: data.CedulaContacto,
        CelularContacto: data.CelularContacto,
        ParentezcoContacto: data.ParentezcoContacto,
      });
  };
  eliminarPaciente = (IdPaciente, id) => {
    return db
      .collection("Hospitales")
      .doc(id)
      .collection("Pacientes")
      .doc(IdPaciente)
      .delete();
  };
  altaPaciente = (threadKey, IdPaciente, idHistorial) => {
    return db
      .collection("Hospitales")
      .doc(threadKey)
      .collection("Pacientes")
      .doc(IdPaciente)
      .collection("Historial")
      .doc(idHistorial)
      .update({
        FechaSalida: new Date(),
      });
  };

  updateEstadoPaciente = (IdHospital,IdPaciente, estado) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Pacientes")
      .doc(IdPaciente)
      .update({
        EstadoPaciente: estado,
        Area:  null,
        IdArea:  null,
        Habitacion:  null,
        IdHabitacion:  null,
        Cama:  null,
        IdCama:  null,
        Equipo:  null,
        IdEquipo:  null,
      });
  };
  getPacientesByEstado = (observer, IdHospital, estadoPaciente) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Pacientes")
      .where("EstadoPaciente", "==", estadoPaciente)
      .onSnapshot(observer);
  };
  getAllPacientes = (observer, IdHospital) => {

    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Pacientes")
      .onSnapshot(observer);
  };

  getPacienteByHabitacion = (IdHospital, idDoc) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .where("IdPaciente", "==", idDoc)
      .where("EstadoHabitacion", "==", 2)
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
  getPacienteByCedula = (observer, idBomba, Cedula) => {
    return db
      .collection("Hospitales")
      .doc(idBomba)
      .collection("Pacientes")
      .where("Cedula", "==", Cedula.toString())
      .onSnapshot(observer);
  };
  getPacienteById = (idBomba, Cedula) => {
    return db
      .collection("Hospitales")
      .doc(idBomba)
      .collection("Pacientes")
      .doc(Cedula)
      .get();
  };
  eliminarRegistro = (IdHospitales,Registro) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Pacientes")
      .doc(Registro.id)
      .delete();
  };
  estadoRegistro = (IdHospitales,Registro) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Pacientes")
      .doc(Registro.id)
      .update({
        Estado: !Registro.data().Estado
      });
  };

}

export default new PacienteService();
