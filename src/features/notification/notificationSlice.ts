import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState : Array<Notif> = [] as Array<Notif>

export const notificationSlice = createSlice({
    name: "notifications",
    initialState: initialState,
    reducers: {
        setNotifications: (state: Array<Notif>, action: PayloadAction<Array<Notif>>) => {
            return [...action.payload] as Array<Notif>
        }
    }
})

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;