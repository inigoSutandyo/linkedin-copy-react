import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import postReducer from '../features/post/postSlice'
import notificationReducer from '../features/notification/notificationSlice'
import messageReducer from '../features/message/messageSlice'



export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        notficiation: notificationReducer,
        message: messageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch