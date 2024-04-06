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
    },
});

export const { loginSuccess, loginStart, loginFailure} = customerSlice.actions;
export default customerSlice.reducer;