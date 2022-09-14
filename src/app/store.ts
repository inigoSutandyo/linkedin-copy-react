import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import postReducer from '../features/post/postSlice'
import notificationReducer from '../features/notification/notificationSlice'



export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        notficiation: notificationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch