import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";

const initialState : UserState = {
    isSignedIn: false,
    user: {} as User
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<User>) => {
            state.user = action.payload,
            state.isSignedIn = true
        },
        logoutUser: (state: UserState) => {
            state.user = {} as User
            state.isSignedIn = false
        },
        setLikedPost: (state: UserState, action: PayloadAction<Array<number>>) => {
            state.user.likeposts = action.payload
        }
    }
})

export const { setUser, logoutUser, setLikedPost } = userSlice.actions;
export default userSlice.reducer;