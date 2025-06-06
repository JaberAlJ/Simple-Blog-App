import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
    user: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const registerUser = createAsyncThunk('users/registerUser', async (userData) => {
    try {
        const response = await axios.post(`${ENV.SERVER_URL}/register-user`, {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const login = createAsyncThunk('users/userLogin', async (userData) => {
    try {
        const response = await axios.post(`${ENV.SERVER_URL}/login`, {
            email: userData.email,
            password: userData.password,
        });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const logout = createAsyncThunk('users/logout', async (userData) => {
    try {
        const response = await axios.post(`${ENV.SERVER_URL}/logout`);
        return response.data;
    } catch (error) {
        return error;
    }
});

const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Registration 
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Registration failed";
            })

            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload.msg || "Login failed";
            })

            // Logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = {};
                state.isLoading = false;
                state.isSuccess = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload.msg || "Logout failed";
            });
    },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;