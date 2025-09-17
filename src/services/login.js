import firebase from "../Firebase";
const db = firebase.firestore();

class AuthService {

    loadWithEmail = (correo) => {
        return db.collection("usuarios").doc(correo).get();
    };
    loginWithEmailAndPassword = async (email, password) => {
        return await firebase.auth().signInWithEmailAndPassword(email, password);
    };
    loadWithEmail = (correo) => {
        return db.collection("usuarios").doc(correo).get();
    };
    getUserByIdDoc = (uid) => {
        return db.collection("usuarios").doc(uid).get();
    };
    resetPassword  = async (email) => {
        return await firebase.auth().sendPasswordResetEmail(email);
    };
    logout  = async () => {
        return  await firebase.auth().signOut();
    };
}

export default new AuthService();
