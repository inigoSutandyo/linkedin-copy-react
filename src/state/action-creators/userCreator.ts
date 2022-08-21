import { UserActionType } from "../action-types/userTypes"
import { Dispatch } from 'redux'
import { UserAction } from "../actions/userAction"


export const updateUser = (user: User) => {

    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: UserActionType.UPDATE,
            payload: user
        })
    }
}