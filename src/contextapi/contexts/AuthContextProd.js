import React, { createContext, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Auth } from '@services'
import { authReducer } from '../../reducers'
import {LoadingScreen} from "@components";

const authState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  IdArea: null,
  fullscream: false
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    localStorage.removeItem("accessToken");
  }
};
const setArea = (IdArea) => {
  if (IdArea) {
    localStorage.setItem("IdArea", IdArea);
  } else {
    localStorage.removeItem("IdArea");
  }
};
const clearCacheData = () => {
  caches.keys().then((names) => {
    names.forEach((name) => {
      caches.delete(name);
    });
  });
};



const AuthContext = createContext({
  ...authState,
  method: "JWT",
  login: () => Promise.resolve(),
  reset: () => Promise.resolve(),
  logout: () => { },
  selectArea: () => { },
  fullScream: () => { },


});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, authState);
  const [loading, setLoading] = React.useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const login = async (email, password) => {
    dispatch({
      type: "INITIALISE",
      payload: {
        isAuthenticated: false,
        isInitialised: true,
        user: null,
      },
    });
    var user = null;
    var userUid = null;
    setLoading(true)

    await Auth.loginWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userUid = userCredential.user.uid;
        Auth.loadWithEmail(email).then((respond) => {
          user = respond.data();
          window.localStorage.setItem("accessToken", respond.id);
          setSession(respond.id);
          setLoading(false)

          dispatch({
            type: "LOGIN",
            payload: {
              user,
            },
          });
          enqueueSnackbar("Bienvenidos", {
            variant: "success",
          });
        });
      })
      .catch((error) => {
        setLoading(false)

        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            isInitialised: false,
            IdArea: null,
            user: null,
          },
        });
        if (error.code === "auth/invalid-email") {
          enqueueSnackbar(
            "La dirección de correo electrónico está mal ingresada.",
            {
              variant: "error",
            }
          );
        }
        if (error.code === "auth/wrong-password") {
          enqueueSnackbar(
            "La contraseña no es válida o el usuario no tiene contraseña.",
            {
              variant: "error",
            }
          );
        }
        if (error.code === "auth/user-not-found") {
          enqueueSnackbar(
            "No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.",
            {
              variant: "error",
            }
          );
        }
      });
  };

  const reset = async (email) => {
    dispatch({
      type: "INITIALISE",
      payload: {
        isAuthenticated: false,
        isInitialised: true,
        IdArea: null,
        user: null,
      },
    });
    await Auth.then((email) => {
      logout();
      enqueueSnackbar("Clave enviada correctamente", {
        variant: "success",
      });
    })
      .catch((error) => {
        setErrorMsg(errorTrad[error.code] ? errorTrad[error.code] : "Algo salió mal :/");
      });


  };
  const logout = async () => {
    setLoading(true)
    Auth.logout().then(function () {
      window.localStorage.clear();
      window.localStorage.setItem("accessToken", null);
      clearCacheData();
      setSession(null);
      setLoading(false)

      dispatch({
        type: "LOGOUT",
      });
    });
  };
  const selectArea = async (area) => {
    setArea(area.id);
    dispatch({
      type: "AREA",
      payload: {
        IdArea: area.id,
        NombreArea: area.data().Nombre,

      },

    });
  };
  const fullScream = async (fullscream) => {
    dispatch({
      type: "FULLSCREAM",
      payload: {
        fullscream: fullscream,
      },

    });
  };

  useEffect(() => {

    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const IdArea = window.localStorage.getItem("IdArea");
        if (accessToken) {

          await Auth.getUserByIdDoc(accessToken.toString()).then((respond) => {
            if (respond.exists) {
              setSession(respond.id);
              let user = respond.data();
              dispatch({
                type: "LOGIN",
                payload: {
                  user,
                },
              });
              if (IdArea) {
                dispatch({
                  type: "AREA",
                  payload: {
                    IdArea: IdArea,
                  },

                });
              }
              setLoading(false)

            } else {
              enqueueSnackbar("Usuario no encontrado", {
                variant: "success",
              });
              logout()
              setLoading(false)

            }


          }
          );

          setSession(accessToken);
          setLoading(false)

        } else {
          clearCacheData();

          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,

            },
          });
          setLoading(false)
        }
      } catch (error) {
      console.error(error)
      }
    };

    initialise();
  }, [enqueueSnackbar]);
  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, reset, logout, selectArea, fullScream }}>
      { loading ? <LoadingScreen/>: children}
    </AuthContext.Provider>
  );
};

export default AuthContext;