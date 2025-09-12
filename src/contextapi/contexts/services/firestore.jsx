import { db } from "../../../Firebase";

export const getUserById = (observer, conjuntoID) => {
  return db.collection("usuarios").doc(conjuntoID).onSnapshot(observer);
};