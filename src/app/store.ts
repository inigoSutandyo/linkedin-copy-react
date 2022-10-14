import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import listReducer from '../features/user/listSlice'
import postReducer from '../features/post/postSlice'
import notificationReducer from '../features/notification/notificationSlice'
import messageReducer from '../features/message/messageSlice'
import themeReducer from '../features/theme/themeSlice'



export const store = configureStore({
    reducer: {
        user: userReducer,
        list: listReducer,
        post: postReducer,
        notficiation: notificationReducer,
        message: messageReducer,
        theme: themeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch