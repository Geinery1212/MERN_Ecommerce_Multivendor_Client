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


export const orderReducer = createSlice({
    name: 'cart',
    initialState: {
        successMessage: '',
        errorMessage: '',
        myOrders: [],
        myOrder: {},
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
                state.cart_products_count = state.cart_products_count + 1;
            })
    }
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;