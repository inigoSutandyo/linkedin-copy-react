import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "react";

const initialState = "light" as string

export const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        setTheme: (state: string, action: PayloadAction<string>) => {
            return action.payload
        }
    }
}) 

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer