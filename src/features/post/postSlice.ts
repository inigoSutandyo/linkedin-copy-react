import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState : Array<Post> = [] as Array<Post>

export const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Array<Post>>) => {
            return [...action.payload ] as Array<Post>
        },
        addPost: (state: Array<Post>, action: PayloadAction<Post>) => {
            state.push(action.payload)
        },
        updateSinglePost: (state, action: PayloadAction<Post>) => {
            const newState = state.map(p => p.ID === action.payload.ID ? {...action.payload} : p)
            return [...newState] as Array<Post>
        },
        appendPost: (state, action: PayloadAction<Array<Post>>) => {
            return [...state, ...action.payload] as Array<Post>
        },
        removePost: (state, action: PayloadAction<number>) => {
            return state.filter((p) => {return p.ID != action.payload})
        }
    }
})

export const { setPosts, addPost, updateSinglePost, appendPost, removePost } = postSlice.actions;
export default postSlice.reducer;