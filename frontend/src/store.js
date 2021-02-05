import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import {} from "./reducers/artistReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userConfirmReducer,
  userListReducer,
  userDeleteReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  leaveRequestListReducer,
  leaveRequestListMyReducer,
  leaveRequestCreateReducer,
  leaveRequestDetailsReducer,
  leaveRequestUpdateReducer,
  leaveRequestApproveReducer,
  leaveRequestRejectReducer,
} from "./reducers/leaveRequestReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userConfirm: userConfirmReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  leaveRequestList: leaveRequestListReducer,
  leaveRequestDetails: leaveRequestDetailsReducer,
  leaveRequestListMy: leaveRequestListMyReducer,
  leaveRequestCreate: leaveRequestCreateReducer,
  leaveRequestUpdate: leaveRequestUpdateReducer,
  leaveRequestApprove: leaveRequestApproveReducer,
  leaveRequestReject: leaveRequestRejectReducer,
  // orderCreate: orderCreateReducer,
  // orderDetails: orderDetailsReducer,
  // orderPay: orderPayReducer,
  // orderDeliver: orderDeliverReducer,
  // orderList: orderListReducer,
});

const userInfoFromStorage = localStorage.getItem("lmUserInfo")
  ? JSON.parse(localStorage.getItem("lmUserInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
