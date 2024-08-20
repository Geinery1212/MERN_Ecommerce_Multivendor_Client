import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
// import { jwtDecode } from 'jwt-decode';
//asynchronous aperations
export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log(info);
            // await new Promise(resolve => setTimeout(resolve, 2000));
            const { data } = await api.post('/customer/register', info, { withCredentials: true });
            localStorage.setItem('customerToken', data.token);
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

            .addCase(customer_register.pending, (state, { payload }) => {
                state.loader = true;
            }).addCase(customer_register.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.error;
            }).addCase(customer_register.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;       
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
            })
    }
});
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;