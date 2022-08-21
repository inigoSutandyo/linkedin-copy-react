import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";

const initialState : UserState = {
    isSignedIn: false,
    user: {} as User
}

export const userSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isSignedIn = true
        },
        logoutUser: (state: UserState) => {
            state.user = {} as User
            state.isSignedIn = false
        }
    }
})

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;