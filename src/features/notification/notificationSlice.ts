import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState : Array<Notif> = [] as Array<Notif>

export const notificationSlice = createSlice({
    name: "notifications",
    initialState: initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<Array<Notif>>) => {
            return [...action.payload] as Array<Notif>
        },
        removeNotification: (state, action: PayloadAction<number>) => {
            return state.filter((n) => {return n.ID != action.payload})
        }
    }
})

export const { setNotifications, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;