import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,  //to keep track of authentication of user, false = user is not authenticated
    userData: null
}

const authSlice = createSlice({
    name: "auth",   //give slice a name so we can refer through this name
    initialState,    //initial state of slice
    reducers: {
        login: (state, action) => {
            state.status = true;    //if logged in change the status to true
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.status = false;
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer