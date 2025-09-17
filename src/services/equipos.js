import firebase from "../Firebase";
const db = firebase.firestore();

class EquiposService {
  getAllEquiposById = (observer, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .onSnapshot(observer);
  };
  getEquiposById = (observer, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .where("Estado", "==", true)
      .onSnapshot(observer);
  };
  getEquiposByEstado = (observer, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .where("Estado", "==", true)
      .onSnapshot(observer);
  };
  getEquiposByEstadoTotal = (observer, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .where("Estado", "==", true)
      .where("EstadoEquipo", "==", 1)
      .onSnapshot(observer);
  };
  deleteBomba = (idBomba, id) => {
    return db
      .collection("Hospitales")
      .doc(id)
      .collection("Pacientes")
      .doc(idBomba)
      .delete();
  };
  getReportesById = (observer, IdHospital, idDoc) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .doc(idDoc)
      .collection("Reportes")
      .onSnapshot(observer);
  };
  updateEquipo = (IdHospital, idDoc, form) => {

    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .doc(idDoc)
      .update({
        Serial: form.Serial,
        Modelo: form.Modelo,
        Codigo: form.Codigo,
        Alambrico: form.alambrico
      });
  };
  updateEquipoReport = (IdHospital, idDoc) => {

    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .doc(idDoc)
      .update({
        EstadoEquipo: 3,

      });
  };
  updateEquipoByEstado = (IdHospital, idEquipo, paciente, datosCamas, estado) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .doc(idEquipo)
      .update({
        EstadoEquipo: estado,
        Area: datosCamas?.area ? JSON.stringify(datosCamas?.area.data()) : null,
        IdArea: datosCamas?.area ? datosCamas?.area.id : null,
        Habitacion: datosCamas?.habitacion ? JSON.stringify(datosCamas?.habitacion.data()) : null,
        IdHabitacion: datosCamas?.habitacion ? datosCamas?.habitacion.id : null,
        Cama: datosCamas.cama ? JSON.stringify(datosCamas.cama.data()) : null,
        IdCama: datosCamas.cama ? datosCamas.cama.id : null,
        DatosPaciente: JSON.stringify(paciente),
        IdPaciente: paciente.Cedula,

      });
  };
  newEquipo = (form, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .doc(form.Serial)
      .set({
        Serial: form.Serial,
        Modelo: form.Modelo,
        Alambrico: form.alambrico,
        Codigo: form.Codigo,
        EstadoEquipo: 1,
        Estado: true,
        Valor: 0
      });
  };
  newReporte = (data, IdHospital, idDoc) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .doc(idDoc)
      .collection("Reportes")
      .add({
        Detalle: data.Detalle,
        FechaReporte: new Date(),
      });
  };

  actualizarEstadoHabitacionPaciente = (IdHospital, idDoc) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .where("IdPaciente", "==", idDoc)
      .where("EstadoHabitacion", "==", 2)
      .get();
  };
  getHabitacionesByPaciente = (IdHospital, idDoc) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .where("IdPaciente", "==", idDoc)
      .where("EstadoHabitacion", "==", 2)
      .get();
  };
  limpiarBomba = async (IdHospital, idDoc) => {
    const cama = await db.collection("Hospitales").doc(IdHospital).collection("Equipos").doc(idDoc);
    const resultado = await cama.get();
    if (resultado.data().Alambrico) {
      return "ok"
    } else {
      return db
        .collection("Hospitales")
        .doc(IdHospital)
        .collection("Equipos")
        .doc(idDoc)
        .update({
          EstadoEquipo: 1,
          IdPaciente: null,
          DatosPaciente: null,
          Habitacion: null,
          IdHabitacion: null,
          Area: null,
          IdArea: null
        });
    }

  };
  asignarPaciente = (data, IdHospital, idDoc) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Camas")
      .doc(idDoc.id)
      .update({
        EstadoCama: 2,
        IdPaciente: data?.Cedula,
        DatosPaciente: JSON.stringify(data),
      });
  };
  getCamasByHabitacion = (observer, IdHospital, IdHabitacion) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Camas")
      .where("IdHabitacion", "==", IdHabitacion)
      .where("EstadoCama", "==", 1)
      .where("Estado", "==", true)
      .onSnapshot(observer);
  };
  getEquipoByEstado = (observer, IdHospital) => {

    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Equipos")
      .where("EstadoEquipo", "==", 1)
      .where("Alambrico", "==", false)
      .where("Estado", "==", true)
      .onSnapshot(observer);
  };
  getEquips = (observer, IdHospitales) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .orderBy('Fecha', 'desc')
      .where("Estado", "==", true)
      .onSnapshot(observer);
  };
  getAllEquipos = (observer, IdHospitales) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .onSnapshot(observer);
  };
  getEquiposByArea = (observer, area, IdHospitales) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .orderBy('FechaOn', 'desc')
      .where("IdArea", "==", area)
      .where("Estado", "==", true)
      .onSnapshot(observer);
  };
  getEquiposByAreaByEstado = (observer, area, IdHospitales) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .orderBy('FechaOn', 'desc')
      .where("IdArea", "==", area)
      .where("Estado", "==", true)
      .where("Valor", "==", 1)
      .onSnapshot(observer);
  };
  getEquipsByHabitacionAux = (observer, IdHospitales, IdHabitacion) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .where("IdHabitacion", "==", IdHabitacion)
      .where("IdPaciente", "!=", null)
      .orderBy('IdPaciente', 'desc')
      .where("Estado", "==", true)
      .onSnapshot(observer);
  };
  getEquipsByHabitacion = (observer, IdHospitales, IdHabitacion) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .where("IdHabitacion", "==", IdHabitacion)
      .where("Estado", "==", true)
      .orderBy('IdPaciente', 'desc')

      .onSnapshot(observer);
  };
  getEquipsByHabitacionCamas = (observer, IdHospitales, IdHabitacion) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Camas")
      .where("IdHabitacion", "==", IdHabitacion)
      .where("Estado", "==", true)
      .orderBy('IdPaciente', 'desc')

      .onSnapshot(observer);
  };
  quitarEquipoCama = (IdHospitales, IdEquipo) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .doc(IdEquipo)
      .update({
        EstadoEquipo: 1,

        DatosPaciente: null,
        IdPaciente: null,
        Area: null,
        IdArea: null,
        Habitacion: null,
        IdHabitacion: null,
        Cama: null,
        IdCama: null,
        Equipo: null,
        IdEquipo: null,



      });
  };
  eliminarRegistro = (IdHospitales,Registro) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .doc(Registro.id)
      .delete();
  };
  estadoRegistro = (IdHospitales,Registro) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Equipos")
      .doc(Registro.id)
      .update({
        Estado: !Registro.data().Estado
      });
  };
}

export default new EquiposService();
