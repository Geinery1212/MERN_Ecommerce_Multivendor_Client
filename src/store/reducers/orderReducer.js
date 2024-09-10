import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
//asynchronous aperations
export const place_order = createAsyncThunk(
    'order/place_order',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { price, totalPrice, products, shipping_fee, items, shippingInfo, userId, navigate } = info;
            const { data } = await api.post('/customer/order/place_order',
                { price, products, shipping_fee, items, shippingInfo, userId }, { withCredentials: true });

            navigate('/payment', {
                state: {
                    totalPrice,
                    items,
                    orderId: data.orderId
                }
            });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_orders = createAsyncThunk(
    'order/get_orders',
    async (status, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/customer/order/get-orders/${status}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const get_order = createAsyncThunk(
    'order/get_order',
    async (orderId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/customer/order/get-order/${orderId}`, { withCredentials: true });
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const orderReducer = createSlice({
    name: 'order',
    initialState: {
        successMessage: '',
        errorMessage: '',
        myOrders: [],
        myOrder: {}
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(place_order.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
            }).addCase(place_order.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            }).addCase(get_orders.fulfilled, (state, { payload }) => {
                state.myOrders = payload.orders;                
            }).addCase(get_order.fulfilled, (state, { payload }) => {
                state.myOrder = payload.order;                
            })
    }
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;