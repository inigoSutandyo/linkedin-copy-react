import { UserActionType } from "../action-types/userTypes"
import { Dispatch } from 'redux'
import { UserAction } from "../actions/userAction"


const updateUser = (user: User) => {

    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: UserActionType.UPDATE,
            payload: user
        })
    }
}