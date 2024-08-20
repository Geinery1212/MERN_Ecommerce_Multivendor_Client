import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
// import { jwtDecode } from 'jwt-decode';
//asynchronous aperations
export const client_register = createAsyncThunk(
    'auth/client_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(info);
            const { data } = await api.post('/client/register', info, { withCredentials: true });
            localStorage.setItem('clientToken', data.token);
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        // console.log(info);
        try {
            const { data } = await api.post('/seller-login', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);


const returnRole = (token) => {
    if (token) {
        // const decodeToken = jwtDecode(token);
        const decodeToken = token;
        const expireTime = new Date(decodeToken.exp * 1000);
        if (new Date() > expireTime) {
            localStorage.removeItem('accessToken');
        } else {
            return decodeToken.role;
        }
    } else {
        return '';
    }
}
export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: '',
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(client_register.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(client_register.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(client_register.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })

            .addCase(seller_login.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(seller_login.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(seller_login.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })
    }
});
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;