import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";

const initialState : UserState = {
    isSignedIn: false,
    user: {} as User,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<User>) => {
            return {
                ...state,
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
            const arr = action.payload ? action.payload : [] as Array<Number>
    
            return {
                ...state,
                user: {
                    ...state.user,
                    likedposts: arr
                }
            }
        },
        addLikedPost: (state: UserState, action: PayloadAction<Number>) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    likedposts: [...state.user.likedposts, action.payload]
                }
            }
        },
        removeLikedPost: (state: UserState, action: PayloadAction<Number>) => {
            const newArr = [] as Array<Number>
            for (let i = 0; i < state.user.likedposts.length; i++) {
                const element = state.user.likedposts[i];
                if (element === action.payload) {
                    newArr.push(...state.user.likedposts)
                    newArr.splice(i, 1)
                }
            }
            // console.log(newArr)
            return {
                ...state,
                user: {
                    ...state.user,
                    likedposts: [...newArr]
                }
            }
        }, 
    }
})

export const { setUser, logoutUser, setLikedPost, addLikedPost, removeLikedPost } = userSlice.actions;
export default userSlice.reducer;