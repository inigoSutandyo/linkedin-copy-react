import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState : Array<Post> = [] as Array<Post>

export const postSLice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        setPosts: (state: Array<Post>, action: PayloadAction<Array<Post>>) => {
            return action.payload 
        },
        addPost: (state: Array<Post>, action: PayloadAction<Post>) => {
            state.push(action.payload)
        },
    }
})

// export const { setUser, logoutUser, setLikedPost } = userSlice.actions;
// export default userSlice.reducer;