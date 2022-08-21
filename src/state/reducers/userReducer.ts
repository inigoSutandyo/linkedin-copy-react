import { UserActionType } from "../action-types/userTypes"
import { UserAction } from "../actions/userAction"

const initalState = {} as User

const userReducer = (state: User = initalState, action: UserAction) => {
    if (action.type === UserActionType.UPDATE) {
        return {
            ...action.payload
        }
    }
    return state
}

export default userReducer