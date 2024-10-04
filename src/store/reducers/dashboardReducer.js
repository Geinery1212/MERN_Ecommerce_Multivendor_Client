import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";


export const get_index_data = createAsyncThunk(
    'dashboard/get_index_data',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {            
            const { data } = await api.get(`/customer/dashboard/get-index-data`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);




export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState: {
        successMessage: '',
        errorMessage: '',
        recentOrders: [],
        pendingOrders: 0,
        totalOrders: 0,
        cancelledOrders: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_index_data.fulfilled, (state, { payload }) => {
                state.recentOrders = payload.recentOrders;
                state.pendingOrders = payload.pendingOrders;
                state.totalOrders = payload.totalOrders;
                state.cancelledOrders = payload.cancelledOrders;
            })
    }
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;