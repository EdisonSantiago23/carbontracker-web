import firebase from "../Firebase";
const db = firebase.firestore();

class CamaService {
  getAllCamas = (observer, IdHospital) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .onSnapshot(observer);
  };
  getHabitacionesByHospital = (observer,IdHospital, IdHabitacion) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .where("IdHabitacion", "==",IdHabitacion)
      .onSnapshot(observer);
  };
  getCamasByArea = (observer,IdHospital, idHabitacion) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .where("IdHabitacion", "==",idHabitacion)
      .where("Estado", "==", true)
      .onSnapshot(observer);
  };
  getCamasByArea2 =   (observer,IdHospital, IdArea) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .where("IdArea", "==",IdArea)
      .onSnapshot(observer);
  };
  deleteCama = (idCama, IdHospital) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Equipos")
      .doc(idCama)
      .delete();
  };
  getHabitacion = (IdHospital,idHabitaciom) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Habitaciones")
      .doc(idHabitaciom)
      .get();
  };
  newCama = (IdHospital,data, habitacion,area) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .doc()
      .set({
        Nombre: data.Nombre,
        Detalle: data.Detalle,
        IdHabitacion: habitacion.id,
        Habitacion:JSON.stringify(habitacion.data()),
        Area:JSON.stringify(area.data()),
        IdArea:area.id,
        FechaRegistro: new Date(),
        Estado: true,
        EstadoCama:1
      });
  };
  updateCama = (IdHospital,data, habitacion,area) => {
  
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .doc(data.id)
      .update({
        Nombre: data.Nombre,
        Detalle: data.Detalle,
        IdHabitacion: habitacion.id,
        Habitacion:JSON.stringify(habitacion),
        Area:JSON.stringify(area),
        IdArea:area.id,
        FechaActualizacion: new Date(),
      });
  };
  updateCamaByEquipos = (IdHospital, IdCama,Equipo ) => {  
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .doc(IdCama)
      .update({
        Equipo:JSON.stringify(Equipo.data()),
        IdEquipo:Equipo.id
      });
  };
  getHabitacionesByPaciente = (IdHospital, idDoc) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .where("IdPaciente", "==", idDoc)
      .where("EstadoCama", "==", 2)
      .get();
  };
  getHabitacionesByPaciente2 = (observer,IdHabitacion, IdPaciente) => {
    return db
      .collection("Empresas")
      .doc(IdHabitacion)
      .collection("Camas")
      .where("IdPaciente", "==", IdPaciente)
      .where("EstadoCama", "==", 2)
      .onSnapshot(observer);
    };

  asignarPaciente = (data,datosCamas, IdHospital) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .doc(datosCamas.cama.id)
      .update({
        EstadoCama: 2,
        DatosPaciente: JSON.stringify(data),
        IdPaciente:data.Cedula,
        Area: datosCamas?.area ? JSON.stringify(datosCamas?.area.data()) : null,
        IdArea: datosCamas?.area ? datosCamas?.area.id : null,
        Habitacion: datosCamas?.habitacion ? JSON.stringify(datosCamas?.habitacion.data()) : null,
        IdHabitacion: datosCamas?.habitacion ? datosCamas?.habitacion.id : null,
        Equipo: datosCamas.equipo ? JSON.stringify(datosCamas.equipo.data()) : null,
        IdEquipo: datosCamas.equipo ? datosCamas.equipo.id : null,
      });
  };
  limpiarCama = (IdHospital, idDoc) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .doc(idDoc)
      .update({
        EstadoCama: 1,
        IdPaciente: null,
        DatosPaciente: null,
        IdEquipo: null,
        Equipo:null,
      });
  };
  quitarEquipo = (IdHospital, IdCama) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Camas")
      .doc(IdCama)
      .update({
        Equipo: null,
        IdEquipo:null

      });
  };

  eliminarRegistro = (IdEmpresas,Registro) => {
    return db
      .collection("Empresas")
      .doc(IdEmpresas)
      .collection("Camas")
      .doc(Registro.id)
      .delete();
  };
  estadoRegistro = (IdEmpresas,Registro) => {
    return db
      .collection("Empresas")
      .doc(IdEmpresas)
      .collection("Camas")
      .doc(Registro.id)
      .update({
        Estado: !Registro.data().Estado
      });
  };

}

export default new CamaService();
