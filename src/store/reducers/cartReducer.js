import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../connection/api";
import { useId } from "react";
//asynchronous aperations
export const add_cart = createAsyncThunk(
    'cart/add_cart',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(info);
            const { data } = await api.post('/customer/cart/add', info, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_cart_products = createAsyncThunk(
    'cart/get_cart_products',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            // console.log(userId);
            const { data } = await api.get(`/customer/cart/get_products/${userId}`, { withCredentials: true });
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const delete_cart_product = createAsyncThunk(
    'cart/delete_cart_product',
    async (cartId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/customer/cart/delete-product/${cartId}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const quantity_inc = createAsyncThunk(
    'cart/quantity_inc',
    async (cartId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(
                `/customer/cart/quantity-inc`,
                { cartId },
                { withCredentials: true }
            );
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const quantity_dec = createAsyncThunk(
    'cart/quantity_dec',
    async (cartId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(
                `/customer/cart/quantity-dec`,
                { cartId },
                { withCredentials: true }
            );
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const cartReducer = createSlice({
    name: 'cart',
    initialState: {
        successMessage: '',
        errorMessage: '',
        cart_products: [],
        cart_products_count: 0,//All the products, even if they are out of stock               
        price: 0,//Total price with discount applied, if there is
        shipping_fee: 0,
        outofstock_products: [],
        buy_product_items: 0 //Only if they are in stock                        
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
        resetCart: (state, _) => {
            state.successMessage = '';
            state.errorMessage = '';
            state.cart_products = [];            
            state.cart_products_count = 0;
            state.price = 0;
            state.shipping_fee = 0;
            state.outofstock_products = [];
            state.buy_product_items = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_cart.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
            }).addCase(add_cart.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.cart_products_count = state.cart_products_count + 1;
            })

            .addCase(get_cart_products.fulfilled, (state, { payload }) => {
                state.cart_products = payload.cart_products;
                state.cart_products_count = payload.cart_products.length;
                state.price = payload.price;
                state.cart_products_count = payload.cart_products_count;
                state.buy_product_items = payload.buy_product_items;
                state.shipping_fee = payload.shipping_fee;
                state.outofstock_products = payload.outofstock_products;
            })

            .addCase(delete_cart_product.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
            }).addCase(delete_cart_product.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })

            .addCase(quantity_inc.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
            }).addCase(quantity_inc.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })

            .addCase(quantity_dec.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
            }).addCase(quantity_dec.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
    }
});
export const { messageClear, resetCart } = cartReducer.actions;
export default cartReducer.reducer;