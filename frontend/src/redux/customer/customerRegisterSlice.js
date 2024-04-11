import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentCustomer: null,
    error: null,
    loading: false
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state,action) => {
            state.currentCustomer = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state,action) => {
            state.currentCustomer = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state,/*action*/) => {
            state.loading = false;
            //state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state) => {
            state.currentCustomer = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signoutSuccess: (state) => {
            state.currentCustomer = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { loginSuccess, loginStart, loginFailure, updateSuccess, updateStart, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } = customerSlice.actions;
export default customerSlice.reducer;