import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";

const initialState = [] as Array<User>

export const listSlice = createSlice({
    name: "list",
    initialState: initialState,
    reducers: {
        setList: (state, actions: PayloadAction<Array<User>>) => {
            return [...actions.payload]
        }
    }
})

export const { setList } = listSlice.actions;
export default listSlice.reducer;