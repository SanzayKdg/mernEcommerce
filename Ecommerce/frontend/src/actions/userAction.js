import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

import axios from "axios";

// Login USER
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    let link = `/api/v1/login`;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(link, { email, password }, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// REGISTER USER
export const register = (registerData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    let link = `/api/v1/register`;
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(link, registerData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    let link = `/api/v1/profile`;
    const { data } = await axios.get(link);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// LOGOUT USER
export const logout = () => async (dispatch) => {
  try {
    let link = `/api/v1/logout`;
    await axios.get(link);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE USER
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    let link = `/api/v1/profile/update`;
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(link, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    let link = `/api/v1/password/update`;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(link, passwords, config);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    let link = `/api/v1/password/forgot`;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(link, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    let link = `/api/v1/password/reset/${token}`;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(link, passwords, config);

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load all users --- admin
export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });
    let link = `/api/v1/admin/users`;
    const { data } = await axios.get(link);

    dispatch({ type: ALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load single user --- admin
export const getUserDetailsAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    let link = `/api/v1/admin/user/${userId}`;
    const { data } = await axios.get(link);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE user --- Admin
export const updateUserAction = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    let link = `/api/v1/admin/user/${userId}`;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(link, userData, config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete user --- Admin
export const deleteUserAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    let link = `/api/v1/admin/user/${userId}`;
    const { data } = await axios.delete(link);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
