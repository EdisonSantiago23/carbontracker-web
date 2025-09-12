import { db } from "../../../../Firebase";

export const getAllusers = observer => {
  return db.collection("usuarios").onSnapshot(observer);
};
export const newUser = userName => {
  console.log('userName', userName);
  return db.collection("usuarios").doc(userName.Correo).set({
    Nombre: userName.Nombre,
    Apellido: userName.Apellido,
    Cedula: userName.Cedula,
    Correo: userName.Correo,
    Celular: userName.Celular,
    Rol: userName.Rol
  });
};
export const deleteUsuario = (idconjunto, idproveedor) => {
  return db.collection("usuarios").doc(idconjunto).collection("proveedores").doc(idproveedor).delete();
};