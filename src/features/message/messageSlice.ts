import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState : Array<Message> = [] as Array<Message>

export const messageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Array<Message>>) => {
            return [...action.payload]
        },
        appendMessage: (state, action: PayloadAction<Message>) => {
            console.log(action.payload)
            state.push(action.payload)
        }
    }
})

export const { setMessages, appendMessage } = messageSlice.actions
export default messageSlice.reducer