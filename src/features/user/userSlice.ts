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
            return {
                isSignedIn: true,
                user: action.payload
            }
        },
        logoutUser: (state: UserState) => {
            return {
                isSignedIn: false,
                user: {} as User
            }
        },
        setLikedPost: (state: UserState, action: PayloadAction<Array<Number>>) => {
            state.user.likedposts = action.payload ? action.payload : [] as Array<Number>
        }
    }
})

export const { setUser, logoutUser, setLikedPost } = userSlice.actions;
export default userSlice.reducer;