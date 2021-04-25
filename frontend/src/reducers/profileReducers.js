import { USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, CLEAR_CURRENT_PROFILE } from "../constants/profileConstants";

export const userProfileReducer = (state = { profile: null }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { ...state, loading: true };
        case USER_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload };
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case CLEAR_CURRENT_PROFILE:
            return { ...state, profile: null };
        default:
            return state;
    }
};