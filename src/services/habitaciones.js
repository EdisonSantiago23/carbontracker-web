import firebase from "../Firebase";

const db = firebase.firestore();

class HabitacionesService {
  newHabitacion = (data, IdHospital, IdArea) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Habitaciones")
      .add({
        Nombre: data.Nombre,
        Capacidad: data.Capacidad,
        IdArea: IdArea,
        FechaRegistro: new Date(),
        Estado:true
      });
  };
  updateHabitacion = (data, IdHospital, idDoc, IdArea) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)

      .collection("Habitaciones")

      .doc(idDoc)
      .update({
        Nombre: data.Nombre,
        Capacidad: data.Capacidad,
        IdArea: IdArea,
      });
  };
  getHabitaciones = (observer, IdHospital) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Habitaciones")
      .onSnapshot(observer);
  };
  getHabitacionesByArea = (observer,  IdHospital,area) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Habitaciones")
      .where("IdArea", "==", area)
      .onSnapshot(observer);
  };
  getHabitacionesByAreaAndCamas = async (area, IdEmpresas) => {
    const data = [];
    await db
      .collection("Empresas")
      .doc(IdEmpresas)
      .collection("Habitaciones")
      .where("IdArea", "==", area)
      .subscribe(async (habitaciones) => {
        if (habitaciones.docs.length > 0) {
          for (const habitacionesRender of   habitaciones.docs) {
            const response = await db.collection("Empresas").doc(IdEmpresas).collection("Camas").where("IdHabitacion", "==", habitacionesRender.id);
            const resultado=await response.get();
            const libres = resultado.docs.filter((x) => x.data().EstadoCama === 1);
            const ocupados = resultado.docs.filter((x) => x.data().EstadoCama === 2);
            habitacionesRender.libres = libres.length;
            habitacionesRender.ocupados = ocupados.length;
            habitacionesRender.total = resultado.docs.length;
            data.push(habitacionesRender)

          }


        }

      });
    return data
  };
   streamGroceryListItems = (IdEmpresas,area, snapshot, error) => {
    const itemsColRef = collection(db, 'Empresas', IdEmpresas)
    const itemsQuery = query(itemsColRef, where("IdArea", "==", area))
    return onSnapshot(itemsQuery, snapshot, error);
};
  getHabitacionById = (IdEmpresas, idHabitacion) => {
    return db
      .collection("Empresas")
      .doc(IdEmpresas)
      .collection("Habitaciones")
      .doc(idHabitacion)
      .get();;
  };
  deleteHabitacion = (idHabitacion, IdHospital) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)
      .collection("Habitaciones")
      .doc(idHabitacion)
      .delete();
  };
  asignarEnfermero = (data, IdHospital, idDoc) => {
    return db
      .collection("Empresas")
      .doc(IdHospital)

      .collection("Habitaciones")

      .doc(idDoc)
      .update({
        idEncargado: data.idEncargado,
        datosEncargado: JSON.stringify(data.datosEncargado),
      });
  };
  eliminarRegistro = (IdEmpresas,Registro) => {
    return db
      .collection("Empresas")
      .doc(IdEmpresas)
      .collection("Habitaciones")
      .doc(Registro.id)
      .delete();
  };
  estadoRegistro = (IdEmpresas,Registro) => {
    return db
      .collection("Empresas")
      .doc(IdEmpresas)
      .collection("Habitaciones")
      .doc(Registro.id)
      .update({
        Estado: !Registro.data().Estado
      });
  };
}

export default new HabitacionesService();
