import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PostState {
    posts: Array<Post>,
    comment_count: Array<number>
}

const initialState : PostState = {
    posts: [],
    comment_count: [],
}

export const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        setPosts: (state: PostState, action: PayloadAction<PostState>) => {
            return {
                posts: [...action.payload.posts],
                comment_count: [...action.payload.comment_count]
            } as PostState
        },
        addPost: (state: PostState, action: PayloadAction<Post>) => {
            state.posts.push(action.payload)
        },
        updateSinglePost: (state, action: PayloadAction<Post>) => {
            const newPosts = state.posts.map(p => p.ID === action.payload.ID ? {...action.payload} : p)
            return {
                ...state,
                posts: newPosts,
            }
        },
        appendPost: (state: PostState, action: PayloadAction<PostState>) => {
            return {
                posts: [...state.posts, ...action.payload.posts],
                comment_count: [...state.comment_count, ...action.payload.comment_count]
            } as PostState
        },
        removePost: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                posts: state.posts.filter((p) => {return p.ID != action.payload})
            }
        }
    }
})

export const { setPosts, addPost, updateSinglePost, appendPost, removePost } = postSlice.actions;
export default postSlice.reducer;