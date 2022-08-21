import { UserActionType } from '../action-types/userTypes'

interface UpdateUserAction {
    type: UserActionType.UPDATE
    payload: User
}

// type Action = UpdateUserAction | OtherAction | ...

export type UserAction = UpdateUserAction 