import firebase from "../Firebase";

const db = firebase.firestore();

class HabitacionesService {
  newHabitacion = (data, IdHospital, IdArea) => {
    return db
      .collection("Hospitales")
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
      .collection("Hospitales")
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
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Habitaciones")
      .onSnapshot(observer);
  };
  getHabitacionesByArea = (observer,  IdHospital,area) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Habitaciones")
      .where("IdArea", "==", area)
      .onSnapshot(observer);
  };
  getHabitacionesByAreaAndCamas = async (area, IdHospitales) => {
    const data = [];
    await db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Habitaciones")
      .where("IdArea", "==", area)
      .subscribe(async (habitaciones) => {
        if (habitaciones.docs.length > 0) {
          for (const habitacionesRender of   habitaciones.docs) {
            const response = await db.collection("Hospitales").doc(IdHospitales).collection("Camas").where("IdHabitacion", "==", habitacionesRender.id);
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
   streamGroceryListItems = (IdHospitales,area, snapshot, error) => {
    const itemsColRef = collection(db, 'HOSPITALES', IdHospitales)
    const itemsQuery = query(itemsColRef, where("IdArea", "==", area))
    return onSnapshot(itemsQuery, snapshot, error);
};
  getHabitacionById = (IdHospitales, idHabitacion) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Habitaciones")
      .doc(idHabitacion)
      .get();;
  };
  deleteHabitacion = (idHabitacion, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Habitaciones")
      .doc(idHabitacion)
      .delete();
  };
  asignarEnfermero = (data, IdHospital, idDoc) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)

      .collection("Habitaciones")

      .doc(idDoc)
      .update({
        idEncargado: data.idEncargado,
        datosEncargado: JSON.stringify(data.datosEncargado),
      });
  };
  eliminarRegistro = (IdHospitales,Registro) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Habitaciones")
      .doc(Registro.id)
      .delete();
  };
  estadoRegistro = (IdHospitales,Registro) => {
    return db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Habitaciones")
      .doc(Registro.id)
      .update({
        Estado: !Registro.data().Estado
      });
  };
}

export default new HabitacionesService();
