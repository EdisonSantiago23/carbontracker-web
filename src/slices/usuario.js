import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    usuario: []
};

const slice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        getUsuario(state, action) {
            const { usuario } = action.payload;
            state.usuario = usuario;
        },
    }
});

export const reducer = slice.reducer;

export const getUsuario = () => async (dispatch) => {

    dispatch(true);
};

export default slice;
