import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState : Array<Post> = [] as Array<Post>

export const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        setPosts: (state: Array<Post>, action: PayloadAction<Array<Post>>) => {
            return [...action.payload ]
        },
        addPost: (state: Array<Post>, action: PayloadAction<Post>) => {
            state.push(action.payload)
        },
        updateSinglePost: (state: Array<Post>, action: PayloadAction<Post>) => {
            const newState = state.map(p => p.ID === action.payload.ID ? {...action.payload} : p)
            return [...newState]
        }
    }
})

export const { setPosts, addPost, updateSinglePost } = postSlice.actions;
export default postSlice.reducer;