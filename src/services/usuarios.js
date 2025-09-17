import firebase from "../Firebase";
const db = firebase.firestore();

class UsuariosService {
    getUser = (userId) => {
        return db.collection("usuarios").doc(userId).get()
    };
    newUser = (values) => {
        return db.collection("usuarios").doc(values.Correo).set({
            Nombre: values.Nombre,
            Apellido: values.Apellido,
            Cedula: values.Cedula,
            Correo: values.Correo,
            Rol: values.Rol,
            FechaRegistro: new Date(),
            IdHospital: values?.IdHospital ? values?.IdHospital : "x",
            Estado: true
        })
    };


    getAllUsuarios = (observer) => {
        return db.collection("usuarios").onSnapshot(observer);

    };
    getUsuarioByHispital = (observer, IdHospital) => {
        return db.collection("usuarios").where('IdHospital', '==', IdHospital).onSnapshot(observer);

    };
    eliminarRegistro = (Registro) => {
        return db
            .collection("usuarios")
            .doc(Registro.id)
            .delete();
    };
    estadoRegistro = (Registro) => {
        return db
            .collection("usuarios")
            .doc(Registro.id)
            .update({
                Estado: !Registro.data().Estado
            });
    };



}

export default new UsuariosService();
