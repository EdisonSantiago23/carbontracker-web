import firebase from "../Firebase";
const db = firebase.firestore();

class AreaService {
  newArea = (data, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Areas")
      .add({
        Nombre: data.Nombre,
        Numero: data.Numero,
        FechaRegistro: new Date(),
      });
  };
  updateArea = (data, IdHospital, idDoc) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Habitaciones")
      .doc(idDoc)
      .update({
        Nombre: data.Nombre,
        Numero: data.Numero,

        FechaRegistro: new Date(),
      });
  };
  getAreaById = (observer, IdHospital) => {
    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Areas")
      .orderBy('Nombre', 'desc')
      .onSnapshot(observer);
  };
  getHabitacionesByHospital = (observer, IdHospital, IdArea) => {

    return db
      .collection("Hospitales")
      .doc(IdHospital)
      .collection("Habitaciones")
      .where("IdArea", "==", IdArea)
      .onSnapshot(observer);
  };
  getHabitacionesByAreaAndCamas = async (IdHospitales, area) => {
    const data = [];
    const habitaciones = await db
      .collection("Hospitales")
      .doc(IdHospitales)
      .collection("Habitaciones")
      .where("IdArea", "==", area)
      .get();

    if (habitaciones.docs.length > 0) {
      const dataMapped = await Promise.all(
        habitaciones.docs.map(async (ress) => {
          const totalCamas = await db
            .collection("Hospitales")
            .doc(IdHospitales)
            .collection("Camas")
            .where("IdHabitacion", "==", ress.id)
            .get();
          let Habitaciones = ress.data();
          Habitaciones.TotalCamas = totalCamas;
          Habitaciones.id = ress.id;
          return Habitaciones;
        })
      );
      data.push(...dataMapped);
    }
    return data;
  };
}

export default new AreaService();
