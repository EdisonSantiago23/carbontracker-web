


const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    IdArea:null,
    nombreArea:null,
    user: null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "INITIALISE": {
          const { isAuthenticated, user, isInitialised } = action.payload;
    
          return {
            ...state,
            isAuthenticated,
            isInitialised,
            user,
          };
        }
        case "LOGIN": {
          const { user } = action.payload;
          return {
            ...state,
            isAuthenticated: true,
            isInitialised: false,
            user,
          };
        }
        case "AREA": {
          const { IdArea,NombreArea } = action.payload;
          return {
            ...state,
            IdArea:IdArea,
            nombreArea:NombreArea

          };
        }
        case "FULLSCREAM": {
          const { fullscream } = action.payload;
          return {
            ...state,
            fullscream:fullscream
          };
        }
        
        case "LOGOUT": {
          return {
            isAuthenticated: false,
            user: null,
            isInitialised: false,
            IdArea:null,

          };
        }
    
        default: {
          return { ...state };
        }
      }
};
