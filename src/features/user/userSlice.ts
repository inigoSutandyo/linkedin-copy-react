import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : UserState = {
    isSignedIn: false,
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<User | null>) => {
            state.user = action.payload
            state.isSignedIn = action.payload ? true : false
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;